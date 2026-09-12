/**
 * Facebook profile scraper — adapted from editgen-suite.
 * Uses puppeteer-core + system Chrome; cookies from env vars FB_USER_ID & FB_COOKIE.
 */
import puppeteer from 'puppeteer-core';

const FB_SELECTORS = {
  profileName: 'h1',
  profilePicture: '.x1rg5ohu image',
  coverPicture: "[data-imgperflogname='profileCoverPhoto']",
  bio: "div > div:nth-child(1) > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x78zum5.xdt5ytf.x1t2pt76 > div > div > div.x6s0dn4.x78zum5.xdt5ytf.x193iq5w > div.x9f619.x193iq5w.x1talbiv.x1sltb1f.x3fxtfs.xf7dkkf.xv54qhq.xw7yly9 > div > div.x9f619.x1n2onr6.x1ja2u2z.xeuugli.xs83m0k.xjl7jj.x1xmf6yo.x1xegmmw.x1e56ztr.x13fj5qh.xnp8db0.x1d1medc.x7ep2pv.x1xzczws > div.x7wzq59 > div > div:nth-child(1) > div > div > div > div > div.xieb3on > div:nth-child(1) > div > div > span",
  friends: ".x193iq5w > a",
  friendsGrid: ".x1cy8zhl.x78zum5.x1a02dak.x1qughib > div",
  actualFriendsCount: "div.x1n2onr6.x1ja2u2z.x9f619.x78zum5.xdt5ytf.x2lah0s.x193iq5w.xjkvuk6.x1cnzs8 > div > div > div > div:nth-child(2) > span > span",
};

/** @returns {{ profileName, coverPicture, profilePicture, bio, friendsCount, friends }} */
export async function scrapeFacebookProfile(facebookUrl) {
  const userId = process.env.FB_USER_ID;
  const cookie = process.env.FB_COOKIE;
  if (!userId || !cookie) throw new Error('FB_USER_ID or FB_COOKIE not configured on the renderer');

  // Normalise URL
  if (!/^https?:\/\//.test(facebookUrl)) facebookUrl = 'https://' + facebookUrl;
  const urlObj = new URL(facebookUrl);
  if (!/(facebook\.com|fb\.com)$/.test(urlObj.hostname.replace(/^(www\.|m\.|mbasic\.|web\.)/, ''))) {
    throw new Error('Not a valid Facebook URL');
  }

  const executablePath = process.env.CHROME_PATH || '/usr/local/bin/google-chrome';
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 915 });
    await page.setCookie(
      { name: 'c_user', value: userId, domain: '.facebook.com', path: '/', httpOnly: true, secure: true },
      { name: 'xs', value: cookie, domain: '.facebook.com', path: '/', httpOnly: true, secure: true },
    );
    await page.goto(facebookUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for key selectors (best-effort)
    await Promise.allSettled(
      Object.values(FB_SELECTORS).map(sel => page.waitForSelector(sel, { timeout: 5000, visible: true }))
    );

    const data = await page.evaluate((selectors) => {
      const getText = (sel) => { const el = document.querySelector(sel); return el ? (el.textContent || '').trim() : ''; };

      let rawName = getText(selectors.profileName);
      const isVerified = /verified (?:account|profile|badge)/i.test(rawName) || !!document.querySelector('svg[aria-label*="Verified"], [aria-label*="Verified account"]');
      const profileName = rawName.replace(/verified\s+(?:account|profile|badge)/gi, '').trim();

      // Profile picture (SVG image href or img)
      const allCandidateImgs = Array.from(document.querySelectorAll('.x1rg5ohu image, svg image, [role="img"] image, img'));
      const avatarEl = allCandidateImgs.find(el => {
        const w = Number(el.width?.baseVal?.value || el.getAttribute('width') || el.width || 0);
        const h = Number(el.height?.baseVal?.value || el.getAttribute('height') || el.height || 0);
        return w >= 100 && w <= 250 && Math.abs(w - h) < 10;
      }) || allCandidateImgs.find(el => {
        const w = Number(el.width?.baseVal?.value || el.getAttribute('width') || el.width || 0);
        return w >= 100 && w <= 250;
      }) || allCandidateImgs[1] || null;

      const profilePicture = avatarEl
        ? (avatarEl.getAttribute('href') || avatarEl.href?.baseVal || avatarEl.src || avatarEl.getAttribute('xlink:href'))
        : null;

      // Cover photo
      const coverEl = document.querySelector(selectors.coverPicture);
      const coverPicture = coverEl ? coverEl.src : null;

      // Bio
      const bioEl = document.querySelector(selectors.bio);
      let bio = bioEl ? bioEl.textContent.trim() : null;
      const bMatch = document.body ? document.body.innerText.match(/Intro\s*\n+([^\n]+(?:\n+[^\n]+){0,2})/i) : null;
      if (bMatch && (!bio || bio.length < 5)) {
        bio = bMatch[1].split('\n').map(s => s.trim()).filter(s => s && !s.includes('followers') && !s.includes('Page ·') && !s.includes('Confirmed')).join(' • ');
      }

      // Friends / Followers count
      const connEls = document.querySelectorAll(selectors.friends);
      const bodyText = document.body ? document.body.innerText : '';
      const fMatch = bodyText.match(/([\d\.,]+[KkMm]?)\s*followers/i);
      let friendsCount = fMatch ? fMatch[1] : null;
      if (!friendsCount && connEls[0]) {
        const parts = connEls[0].innerText.trim().split(/\s+/);
        if (parts.length >= 1 && !/forgot/i.test(parts[0])) friendsCount = parts[0];
      }

      // Friends grid (first 6)
      let friends = [];
      const scrollAndCollect = async () => {
        let collected = [];
        for (let i = 0; i < 5 && collected.length < 6; i++) {
          window.scrollBy(0, 500);
          await new Promise(r => setTimeout(r, 1500));
          const items = Array.from(document.querySelectorAll(selectors.friendsGrid));
          for (const item of items.slice(collected.length, 6)) {
            const img = item.querySelector('img');
            const nameEl = item.querySelector('span');
            if (img && nameEl) {
              collected.push({ name: nameEl.textContent.trim(), avatar: img.src });
            }
          }
        }
        return collected;
      };

      // Details list (Education, Work, Location, Joined, Relationship)
      const textNodes = Array.from(document.querySelectorAll('span, div'))
        .map(el => (el.innerText || '').trim())
        .filter(t => t && t.length > 3 && t.length < 120 && !t.includes('\n'));

      const patterns = [
        /^(worked|works) at /i,
        /^(studied|studies|went to) /i,
        /^(lives in|lived in) /i,
        /^(from) /i,
        /^(joined) /i,
        /^(followed by) /i,
        /^(in a relationship|married|single|engaged|in an open relationship)/i,
        /^(founder|ceo|director|engineer|developer|student) /i
      ];

      const details = [];
      for (const t of textNodes) {
        if (patterns.some(p => p.test(t)) && !details.includes(t)) {
          details.push(t);
        }
      }

      // Check if profile is locked
      const isLocked = bodyText.includes('locked his profile') || bodyText.includes('locked her profile') || bodyText.includes('locked their profile');

      // Timeline posts (articles on profile feed)
      const articles = Array.from(document.querySelectorAll('div[role="article"]'));
      const posts = articles.slice(0, 3).map(art => {
        const textNodes = Array.from(art.querySelectorAll('div[dir="auto"]')).map(d => (d.innerText || '').trim()).filter(Boolean);
        const imgs = Array.from(art.querySelectorAll('img'))
          .map(i => i.src)
          .filter(s => s && s.startsWith('http') && !s.includes('rsrc.php') && !s.includes('emoji') && !s.includes('profile') && !s.includes('192x192'));
        const timeEl = art.querySelector('abbr, a[role="link"] span');
        return {
          text: textNodes[0] || '',
          images: imgs.slice(0, 2),
          time: timeEl ? (timeEl.innerText || '').trim() : 'Just now'
        };
      }).filter(p => p.text || p.images.length > 0);

      return { profileName, isVerified, coverPicture, profilePicture, bio, friendsCount, details, isLocked, posts, _needsScroll: !!connEls[0] };
    }, FB_SELECTORS);

    // Scroll down to load friends, intro details, and timeline posts
    const scrollData = await page.evaluate(async (friendsSel) => {
      let collectedFriends = [];
      for (let i = 0; i < 3 && collectedFriends.length < 6; i++) {
        window.scrollBy(0, 500);
        await new Promise(r => setTimeout(r, 600));
        const items = Array.from(document.querySelectorAll(friendsSel));
        for (const item of items.slice(collectedFriends.length, 6)) {
          const img = item.querySelector('img');
          const nameEl = item.querySelector('span');
          if (img && nameEl) {
            collectedFriends.push({ name: nameEl.textContent.trim(), avatar: img.src });
          }
        }
      }

      // Scroll deeper to trigger dynamic loading of timeline posts
      for (let i = 0; i < 6; i++) {
        window.scrollBy(0, 1200);
        await new Promise(r => setTimeout(r, 1200));
      }

      // Helper to clone element and strip aria-hidden decoy spans injected by Facebook
      const getVisibleText = (root) => {
        try {
          const clone = root.cloneNode(true);
          const decoys = clone.querySelectorAll('[aria-hidden="true"]');
          decoys.forEach(d => d.remove());
          return clone.innerText || '';
        } catch (_) {
          return root.innerText || '';
        }
      };

      const commentInputs = Array.from(document.querySelectorAll('[aria-label*="Write a comment"], [placeholder*="Write a comment"]'));
      const posts = [];
      const seenImages = new Set();
      const seenTexts = new Set();

      commentInputs.forEach((input) => {
        let card = input;
        for (let i = 0; i < 30 && card; i++) {
          card = card.parentElement;
          if (!card) break;
          const txt = card.innerText || '';
          if (txt.includes('Shared with') || (txt.includes('Like') && txt.includes('Comment'))) {
            if (card.parentElement && (card.parentElement.innerText.match(/Write a comment/g) || []).length > 1) {
              break;
            }
          }
        }
        if (!card) return;

        const imgs = Array.from(card.querySelectorAll('img'))
          .map(i => i.src)
          .filter(s => s && s.startsWith('http') && !s.includes('rsrc.php') && !s.includes('emoji') && !s.includes('profile') && !s.includes('s60x60') && !s.includes('p50x50'));

        const primaryImage = imgs[0] || null;
        if (primaryImage && seenImages.has(primaryImage)) return;
        if (primaryImage) seenImages.add(primaryImage);

        // Extract candidate caption text directly from post body elements
        const candidateTextEls = Array.from(card.querySelectorAll('div[dir="auto"], span[dir="auto"]'))
          .filter(el => !el.closest('[aria-label*="comment" i], [role="button"], blockquote, form, ul, [data-visualcompletion="ignore-dynamic"]'))
          .map(el => {
            const clone = el.cloneNode(true);
            clone.querySelectorAll('[aria-hidden="true"]').forEach(d => d.remove());
            return clone.innerText.trim();
          })
          .filter(t => t.length > 5 && !/^(Facebook|Write a comment|Shared with|Create Ad|No insights|Public|Friends)/i.test(t));

        let postText = candidateTextEls[0] || '';
        if (!postText) {
          const rawText = getVisibleText(card);
          const lines = rawText.split('\n')
            .map(l => l.trim())
            .filter(l => l && l.length > 2)
            .filter(l => !/^(Facebook|Write a comment|Create Ad|No insights to show|Shared with|Like|Comment|Share|Send in Messenger)/i.test(l))
            .filter(l => !/^[a-zA-Z0-9\u0300-\u036f]{1,2}$/.test(l));
          postText = lines[0] || '';
        }

        postText = postText.replace(/^.*?Shared with\s*(?:Public|Friends|Only me)?/i, '')
                           .replace(/^(?:Public|Friends|Only me|Verified account)\s*/i, '')
                           .trim();
        postText = postText.split(/\.\.\.\s*See more|See more/i)[0].trim();
        postText = postText.split(/[a-zA-Z0-9_\-]+\.(?:com|net|org|io|co|me)\b/i)[0].trim();
        if (/[\u0300-\u036f]/.test(postText)) {
          postText = postText.split(/[\u0300-\u036f]/)[0].trim().replace(/[a-zA-Z]$/, '').trim();
        }

        if (postText && seenTexts.has(postText) && !primaryImage) return;
        if (postText) seenTexts.add(postText);

        const cardText = card.innerText || '';
        const timeMatch = cardText.match(/\b(\d+[smhdwy]|yesterday|just now)\b/i);
        const time = timeMatch ? timeMatch[1] : 'Recently';

        const rxMatch = cardText.match(/([\d.,]+[KkMm]?)\s*(?:reactions|likes)/i);
        const cmMatch = cardText.match(/([\d.,]+[KkMm]?)\s*comments/i);
        const shMatch = cardText.match(/([\d.,]+[KkMm]?)\s*shares/i);

        const isVideo = !!card.querySelector('video, [data-video-id], [href*="/videos/"], [href*="/reel/"]') || imgs.some(s => s.includes('/t15.'));

        posts.push({
          text: postText,
          images: primaryImage ? [primaryImage] : [],
          time,
          isVideo,
          reactions: rxMatch ? rxMatch[1] : '1.4K',
          commentsCount: cmMatch ? cmMatch[1] : '54',
          sharesCount: shMatch ? shMatch[1] : '16',
        });
      });

      return { friends: collectedFriends, posts };
    }, FB_SELECTORS.friendsGrid);

    delete data._needsScroll;
    data.friends = scrollData.friends && scrollData.friends.length > 0 ? scrollData.friends : data.friends || [];
    if (scrollData.posts && scrollData.posts.length > 0) {
      data.posts = scrollData.posts;
    }

    return data;
  } finally {
    await browser.close();
  }
}
