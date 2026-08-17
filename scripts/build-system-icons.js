const fs = require('fs');
const path = require('path');

const SVGS_DIR = path.join(__dirname, '..', 'lawnicons-repo', 'svgs');

const SYSTEM_ICON_MAP = {
  // Status Bar
  status_wifi: 'google_wifi.svg',
  status_5g: '_5g_tile.svg',
  status_battery: 'abattery.svg',
  status_message: 'google_messages.svg',
  status_mail: 'gmail.svg',
  status_media: 'amll_player.svg',

  // Quick Settings Tiles
  qs_internet: 'google_wifi.svg',
  qs_bluetooth: 'generic_bluetooth.svg',
  qs_dark_theme: 'black_screen.svg',
  qs_themed_icons: 'adaptive_you_icons.svg',
  qs_flashlight: 'flashlight.svg',
  qs_wallpaper: 'wallpaper_engine.svg',
  qs_dnd: 'dnd_sync.svg',
  qs_rotate: 'generic_rotation.svg',
  qs_settings: 'generic_settings.svg',
  qs_power: 'generic_power.svg',

  // Notifications & Media
  notif_message: 'google_messages.svg',
  notif_mail: 'gmail.svg',
  notif_spotify: 'spotify.svg',
  notif_yt_music: 'vanced_youtube_music.svg',
  notif_discord: 'discord.svg',
};

const output = {};

for (const [key, filename] of Object.entries(SYSTEM_ICON_MAP)) {
  const filePath = path.join(SVGS_DIR, filename);
  if (fs.existsSync(filePath)) {
    output[key] = fs.readFileSync(filePath, 'utf-8');
    console.log(`✓ System Icon Loaded: ${key} -> svgs/${filename}`);
  } else {
    console.warn(`✗ Missing icon for: ${key}`);
  }
}

const destPath = path.join(__dirname, '..', 'src', 'lib', 'official-system-icons.json');
fs.writeFileSync(destPath, JSON.stringify(output, null, 2), 'utf-8');
console.log(`Saved ${Object.keys(output).length} official system icons to ${destPath}`);
