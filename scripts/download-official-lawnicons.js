const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NodeJS' } }, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`Status ${res.statusCode} for ${url}`));
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

const OFFICIAL_LAWNICONS_MAP = {
  lawnchair_settings: 'lawnchair.svg',
  phone: 'google_phone.svg',
  messages: 'google_messages.svg',
  camera: 'camera2.svg',
  chrome: 'google_chrome.svg',
  play_store: 'google_play_store.svg',
  photos: 'google_photos.svg',
  gmail: 'gmail.svg',
  settings: 'generic_settings.svg',
  maps: 'google_maps.svg',
  youtube: 'youtube.svg',
  spotify: 'spotify.svg',
  clock: 'desk_clock.svg',
  calculator: 'calculator_you.svg',
  calendar: 'google_calendar.svg',
  drive: 'google_drive.svg',
  files: 'files_by_google.svg',
  weather: 'geometric_weather.svg',
  keep_notes: 'google_keep.svg',
  discord: 'discord.svg',
  github: 'github.svg',
  whatsapp: 'whatsapp.svg',
  yt_music: 'vanced_youtube_music.svg',
  recorder: 'audio_recorder.svg',
  contacts: 'google_contacts.svg',
  pixel_tips: 'pixel_tips.svg',
};

async function downloadLawnicons() {
  console.log('Downloading 100% official Lawnicons from LawnchairLauncher/lawnicons...');
  const outputDir = path.join(__dirname, '..', 'public', 'icons', 'lawnicons');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const results = {};

  for (const [appId, filename] of Object.entries(OFFICIAL_LAWNICONS_MAP)) {
    const rawUrl = `https://raw.githubusercontent.com/LawnchairLauncher/lawnicons/develop/svgs/${filename}`;
    try {
      const svg = await fetchText(rawUrl);
      fs.writeFileSync(path.join(outputDir, `${appId}.svg`), svg, 'utf-8');
      results[appId] = svg;
      console.log(`✓ Copied official Lawnicons SVG: ${appId} <- svgs/${filename}`);
    } catch (err) {
      console.error(`Failed ${filename}:`, err.message);
    }
  }

  const bundlePath = path.join(__dirname, '..', 'src', 'lib', 'official-lawnicons.json');
  fs.writeFileSync(bundlePath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Saved official Lawnicons bundle with ${Object.keys(results).length} icons!`);
}

downloadLawnicons();
