import {readFileSync, existsSync, statSync} from 'node:fs';

const modal = readFileSync(new URL('../src/components/controls/RemotionVideoModal.tsx', import.meta.url), 'utf8');
const remotionEntry = readFileSync(new URL('../src/remotion/index.ts', import.meta.url), 'utf8');
const tailwindConfig = readFileSync(new URL('../tailwind.config.js', import.meta.url), 'utf8');
const composition = readFileSync(new URL('../src/remotion/PhoneShowcaseVideo.tsx', import.meta.url), 'utf8');
const root = readFileSync(new URL('../src/remotion/Root.tsx', import.meta.url), 'utf8');
const remotionCssPath = new URL('../src/remotion/remotion.css', import.meta.url);
const failures = [];

if (remotionEntry.includes("import '../app/globals.css'")) {
  failures.push('Remotion entry imports raw Tailwind directives instead of compiled CSS');
}
if (!tailwindConfig.includes("./src/remotion/**/*.{js,ts,jsx,tsx,mdx}")) {
  failures.push('Tailwind does not scan Remotion compositions for utility classes');
}
if (!composition.includes('<DeviceFrame isFrameEnabled={false}>')) {
  failures.push('Remotion composition still renders the outer phone chassis');
}
if (composition.includes('deviceScale')) {
  failures.push('Remotion composition still applies outer-device scaling');
}
if (!composition.includes('const screenScale = 2')) {
  failures.push('borderless 412x915 screen is not pixel-doubled to fill 824x1830');
}
if (!root.includes('width={824}') || !root.includes('height={1830}')) {
  failures.push('Remotion composition does not use the exact 412:915 screen ratio');
}
if (!remotionEntry.includes("import './remotion.css'")) {
  failures.push('Remotion entry does not import precompiled Tailwind CSS');
}
if (!existsSync(remotionCssPath)) {
  failures.push('precompiled Remotion Tailwind CSS is missing');
} else {
  const remotionCss = readFileSync(remotionCssPath, 'utf8');
  if (!remotionCss.includes('.grid-cols-4')) failures.push('compiled Remotion CSS lacks grid-cols-4');
  if (!remotionCss.includes('.overflow-hidden')) failures.push('compiled Remotion CSS lacks overflow-hidden');
}
if (modal.includes("from 'html-to-image'")) failures.push('Remotion exporter still imports html-to-image');
if (modal.includes('toCanvas(')) failures.push('Remotion exporter still rasterizes DOM frames in the browser');
for (const duration of [4, 7]) {
  const path = new URL(`../public/videos/lawnchair-showcase-${duration}s.webm`, import.meta.url);
  if (!existsSync(path)) failures.push(`missing pre-rendered ${duration}s video`);
  else if (statSync(path).size < 10_000) failures.push(`${duration}s video is unexpectedly small`);
  if (!modal.includes(`/videos/lawnchair-showcase-${duration}s.webm`)) {
    failures.push(`modal does not map ${duration}s selection to its video`);
  }
}
if (!modal.includes('downloadSelectedVideo')) failures.push('instant download handler is missing');

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join('\n'));
  process.exit(1);
}
console.log('PASS: Remotion exports use pre-rendered videos with instant downloads');
