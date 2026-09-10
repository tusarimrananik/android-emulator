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

      // Profile picture (SVG image xlink:href)
      const ppNodes = document.querySelectorAll(selectors.profilePicture);
      const profilePicture = ppNodes.length > 1
        ? ppNodes[1].getAttributeNS('http://www.w3.org/1999/xlink', 'href')
        : null;

      // Cover photo
      const coverEl = document.querySelector(selectors.coverPicture);
      const coverPicture = coverEl ? coverEl.src : null;

      // Bio
      const bioEl = document.querySelector(selectors.bio);
      const bio = bioEl ? bioEl.textContent.trim() : null;

      // Friends count
      const connEls = document.querySelectorAll(selectors.friends);
      let friendsCount = null;
      if (connEls[0]) {
        const parts = connEls[0].innerText.trim().split(/\s+/);
        if (parts.length >= 1) friendsCount = parts[0];
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
      const bodyText = document.body ? document.body.innerText : '';
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
      for (let i = 0; i < 4 && collectedFriends.length < 6; i++) {
        window.scrollBy(0, 600);
        await new Promise(r => setTimeout(r, 1200));
        const items = Array.from(document.querySelectorAll(friendsSel));
        for (const item of items.slice(collectedFriends.length, 6)) {
          const img = item.querySelector('img');
          const nameEl = item.querySelector('span');
          if (img && nameEl) {
            collectedFriends.push({ name: nameEl.textContent.trim(), avatar: img.src });
          }
        }
      }

      // Collect real primary timeline posts (exclude comments)
      let msgEls = Array.from(document.querySelectorAll('div[data-ad-preview="message"], div[data-ad-rendering-role="profile_post"]'));
      if (msgEls.length === 0) {
        const articles = Array.from(document.querySelectorAll('div[role="article"]'));
        msgEls = articles
          .filter(a => !a.innerText.includes('Reply') && !a.closest('ul'))
          .map(a => a.querySelector('div[dir="auto"]'))
          .filter(Boolean);
      }

      const posts = msgEls.slice(0, 3).map(el => {
        let card = el;
        for (let i = 0; i < 12 && card; i++) {
          card = card.parentElement;
          if (card && card.getAttribute('role') === 'article') break;
        }

        const text = (el.innerText || '').trim();
        const imgs = card ? Array.from(card.querySelectorAll('img, image'))
          .map(i => i.src || i.getAttribute('href'))
          .filter(s => s && s.startsWith('http') && !s.includes('rsrc.php') && !s.includes('emoji') && !s.includes('profile') && !s.includes('s60x60') && !s.includes('p50x50')) : [];

        const cardText = card ? card.innerText : '';
        const timeMatch = cardText.match(/\b(\d+[smhdwy]|yesterday|just now)\b/i);
        const time = timeMatch ? timeMatch[1] : '1w';

        const rxMatch = cardText.match(/([\d\.,]+[KkMm]?)\s*(?:reactions|likes)/i)
          || cardText.match(/\b([\d\.,]+[KkMm]?)\b/);
        const cmMatch = cardText.match(/([\d\.,]+[KkMm]?)\s*comments/i);
        const shMatch = cardText.match(/([\d\.,]+[KkMm]?)\s*shares/i);

        return {
          text,
          images: imgs.slice(0, 2),
          time,
          reactions: rxMatch ? rxMatch[1] : '2.4K',
          commentsCount: cmMatch ? cmMatch[1] : '150',
          sharesCount: shMatch ? shMatch[1] : '42',
        };
      }).filter(p => p.text || p.images.length > 0);

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
