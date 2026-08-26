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

      const profileName = getText(selectors.profileName);

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

      return { profileName, coverPicture, profilePicture, bio, friendsCount, _needsScroll: !!connEls[0] };
    }, FB_SELECTORS);

    // Scroll and collect friends grid in page context
    let friends = [];
    if (data._needsScroll) {
      friends = await page.evaluate(async (sel) => {
        let collected = [];
        for (let i = 0; i < 5 && collected.length < 6; i++) {
          window.scrollBy(0, 500);
          await new Promise(r => setTimeout(r, 1500));
          const items = Array.from(document.querySelectorAll(sel));
          for (const item of items.slice(collected.length, 6)) {
            const img = item.querySelector('img');
            const nameEl = item.querySelector('span');
            if (img && nameEl) {
              collected.push({ name: nameEl.textContent.trim(), avatar: img.src });
            }
          }
        }
        return collected;
      }, FB_SELECTORS.friendsGrid);
    }

    delete data._needsScroll;
    data.friends = friends;

    return data;
  } finally {
    await browser.close();
  }
}
