import {existsSync, readFileSync} from 'node:fs';

const root = readFileSync(new URL('../src/remotion/Root.tsx', import.meta.url), 'utf8');
const modal = readFileSync(new URL('../src/components/controls/RemotionVideoModal.tsx', import.meta.url), 'utf8');
const compositionPath = new URL('../src/remotion/FacebookWorkflowVideo.tsx', import.meta.url);
const failures = [];

if (!existsSync(compositionPath)) failures.push('Facebook workflow composition is missing');
if (!root.includes('id="FacebookWorkflow"')) failures.push('FacebookWorkflow composition is not registered');
if (!root.includes('durationInFrames={600}')) failures.push('FacebookWorkflow must be exactly 600 frames');
if (!root.includes('fps={30}')) failures.push('FacebookWorkflow must be registered at 30 FPS');
if (!modal.includes("'facebook'")) failures.push('Facebook workflow selector is missing');
if (!modal.includes('FacebookWorkflowVideo')) failures.push('Facebook workflow preview mapping is missing');
if (!modal.includes("JSON.stringify({workflow: 'facebook'})")) failures.push('Facebook workflow real-time render request is missing');
if (modal.includes("'/videos/facebook-workflow-20s.webm'")) failures.push('Facebook workflow still uses a static video');
if (modal.includes('downloadSelectedVideo')) failures.push('Facebook workflow still uses a static download handler');
for (const duration of [4, 7, 30]) {
  if (!modal.includes(`${duration} as const`)) failures.push(`existing ${duration}s workflow selector was removed`);
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join('\n'));
  process.exit(1);
}
console.log('PASS: Facebook Remotion workflow is registered, previewable, and rendered in real time');
