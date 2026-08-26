import {existsSync, readFileSync} from 'node:fs';

const app = readFileSync(new URL('../src/components/apps/FacebookApp.tsx', import.meta.url), 'utf8');
const profilePath = new URL('../src/components/apps/FacebookProfile.tsx', import.meta.url);
const failures = [];

if (!existsSync(profilePath)) failures.push('FacebookProfile component is missing');
const profile = existsSync(profilePath) ? readFileSync(profilePath, 'utf8') : '';

if (!app.includes("type Screen = Tab | 'profile'")) failures.push('profile screen state is missing');
if (!app.includes('onOpenProfile')) failures.push('Menu profile navigation is missing');
if (!app.includes("screen === 'profile'")) failures.push('profile screen rendering is missing');
if (!profile.includes('Lê Công Đắt')) failures.push('source profile name is missing');
if (!profile.includes('I am Dat')) failures.push('source profile bio is missing');
for (const label of ['Add to story', 'Edit profile', 'Details', 'Interests', 'Featured', 'Friends', 'Posts']) {
  if (!profile.includes(label)) failures.push(`source profile section is missing: ${label}`);
}
for (const asset of [
  '../public/facebook/user/lcd-cover.webp',
  '../public/facebook/user/messi.webp',
  '../public/facebook/user/minhhuong.webp',
  '../public/facebook/user/baongan.webp',
  '../public/facebook/user/halinh.webp',
  '../public/facebook/user/minhtri.webp',
]) {
  if (!existsSync(new URL(asset, import.meta.url))) failures.push(`optimized profile asset is missing: ${asset}`);
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join('\n'));
  process.exit(1);
}
console.log('PASS: source-derived own Facebook profile is navigable and complete');
