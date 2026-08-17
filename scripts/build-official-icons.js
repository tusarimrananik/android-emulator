const fs = require('fs');
const path = require('path');

const LAWNICONS_DIR = path.join(__dirname, '..', 'lawnicons-repo', 'svgs');

const ICON_MAP = {
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

const outputDir = path.join(__dirname, '..', 'public', 'icons', 'lawnicons');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const bundle = {};

for (const [appId, svgFile] of Object.entries(ICON_MAP)) {
  const filePath = path.join(LAWNICONS_DIR, svgFile);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    fs.writeFileSync(path.join(outputDir, `${appId}.svg`), content, 'utf-8');
    bundle[appId] = content;
    console.log(`✓ Copied directly from repo: ${appId} <- svgs/${svgFile}`);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
}

const bundlePath = path.join(__dirname, '..', 'src', 'lib', 'official-lawnicons.json');
fs.writeFileSync(bundlePath, JSON.stringify(bundle, null, 2), 'utf-8');
console.log(`Successfully built official icons bundle (${Object.keys(bundle).length} icons)`);
