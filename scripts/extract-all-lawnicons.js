const fs = require('fs');
const path = require('path');

const SVGS_DIR = path.join(__dirname, '..', 'lawnicons-repo', 'svgs');

const targetIcons = {
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
  telegram: 'telegram.svg',
  twitter: 'x.svg',
  instagram: 'instagram.svg',
  reddit: 'reddit.svg',
  netflix: 'netflix.svg',
  notion: 'notion.svg',
  slack: 'slack.svg',
  twitch: 'twitch.svg',
  firefox: 'firefox.svg',
  vlc: 'vlc.svg',
};

const output = {};

for (const [key, svgName] of Object.entries(targetIcons)) {
  const filePath = path.join(SVGS_DIR, svgName);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    output[key] = raw;
    console.log(`✓ Loaded Lawnicons: ${key} -> svgs/${svgName}`);
  } else {
    // try fallback search
    const all = fs.readdirSync(SVGS_DIR);
    const found = all.find(f => f.includes(key));
    if (found) {
      output[key] = fs.readFileSync(path.join(SVGS_DIR, found), 'utf-8');
      console.log(`✓ Found alternative Lawnicons: ${key} -> svgs/${found}`);
    } else {
      console.error(`✗ Missing: ${svgName}`);
    }
  }
}

const destPath = path.join(__dirname, '..', 'src', 'lib', 'official-lawnicons.json');
fs.writeFileSync(destPath, JSON.stringify(output, null, 2), 'utf-8');
console.log(`Saved ${Object.keys(output).length} official Lawnicons into ${destPath}`);
