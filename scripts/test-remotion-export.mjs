import {readFileSync, existsSync, statSync} from 'node:fs';

const modal = readFileSync(new URL('../src/components/controls/RemotionVideoModal.tsx', import.meta.url), 'utf8');
const failures = [];

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
