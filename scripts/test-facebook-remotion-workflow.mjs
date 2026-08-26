import {existsSync, readFileSync, statSync} from 'node:fs';

const root = readFileSync(new URL('../src/remotion/Root.tsx', import.meta.url), 'utf8');
const modal = readFileSync(new URL('../src/components/controls/RemotionVideoModal.tsx', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const compositionPath = new URL('../src/remotion/FacebookWorkflowVideo.tsx', import.meta.url);
const videoPath = new URL('../public/videos/facebook-workflow-20s.webm', import.meta.url);
const failures = [];

if (!existsSync(compositionPath)) failures.push('Facebook workflow composition is missing');
if (!root.includes('id="FacebookWorkflow"')) failures.push('FacebookWorkflow composition is not registered');
if (!root.includes('durationInFrames={600}')) failures.push('FacebookWorkflow must be exactly 600 frames');
if (!root.includes('fps={30}')) failures.push('FacebookWorkflow must be registered at 30 FPS');
if (!modal.includes("'facebook'")) failures.push('Facebook workflow selector is missing');
if (!modal.includes('FacebookWorkflowVideo')) failures.push('Facebook workflow preview mapping is missing');
if (!modal.includes("'/videos/facebook-workflow-20s.webm'")) failures.push('Facebook workflow instant-download mapping is missing');
if (!modal.includes('downloadSelectedVideo')) failures.push('instant static download handler is missing');
const renderCommand = packageJson.scripts?.['render:facebook-video'] ?? '';
if (!renderCommand.includes('FacebookWorkflow public/videos/facebook-workflow-20s.webm')) failures.push('repeatable Facebook render command is missing');
if (!renderCommand.includes('--codec=vp9')) failures.push('Facebook render must use VP9');
if (!renderCommand.includes('--crf=18')) failures.push('Facebook render must use CRF 18');
for (const duration of [4, 7, 30]) {
  if (!modal.includes(`${duration} as const`)) failures.push(`existing ${duration}s workflow selector was removed`);
}
if (!existsSync(videoPath)) failures.push('pre-rendered Facebook workflow video is missing');
else if (statSync(videoPath).size < 10000) failures.push('pre-rendered Facebook workflow video is unexpectedly small');

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join('\n'));
  process.exit(1);
}
console.log('PASS: Facebook Remotion workflow is registered, previewable, and instantly downloadable');
