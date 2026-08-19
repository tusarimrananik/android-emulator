import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {validateRenderRequest, authorizeRequest, createJobStore} from '../server/render-api-core.mjs';

test('requires a matching bearer API key', () => {
  assert.equal(authorizeRequest(undefined, 'secret'), false);
  assert.equal(authorizeRequest('Bearer wrong', 'secret'), false);
  assert.equal(authorizeRequest('Bearer secret', 'secret'), true);
});

test('accepts a supported API workflow and calculates frames', () => {
  const result = validateRenderRequest({
    fps: 60,
    actions: [
      {type: 'home', duration: 1},
      {type: 'openDrawer', duration: 1},
      {type: 'scrollDrawer', duration: 2},
      {type: 'openApp', app: 'calculator', duration: 2},
      {type: 'goHome', duration: 1},
    ],
  });
  assert.equal(result.ok, true);
  assert.equal(result.value.durationInFrames, 420);
});

test('rejects unsupported actions and unsafe durations', () => {
  assert.equal(validateRenderRequest({actions: [{type: 'shell', command: 'rm -rf /'}]}).ok, false);
  assert.equal(validateRenderRequest({actions: [{type: 'home', duration: 301}]}).ok, false);
});

test('job store tracks queued, rendering, completed and failed jobs', () => {
  const store = createJobStore();
  const job = store.create({actions: [{type: 'home', duration: 1}]});
  assert.equal(store.get(job.id).status, 'queued');
  store.update(job.id, {status: 'rendering', progress: 0.5});
  assert.equal(store.get(job.id).progress, 0.5);
  store.update(job.id, {status: 'completed', progress: 1, outputPath: '/tmp/a.webm'});
  assert.equal(store.get(job.id).status, 'completed');
});

test('supports documented action vocabulary', () => {
  const types = ['home', 'openDrawer', 'scrollDrawer', 'openApp', 'tap', 'wait', 'goHome'];
  const actions = types.map((type) => type === 'openApp' ? {type, app: 'camera', duration: 1} : type === 'tap' ? {type, value: '12×8=', duration: 1} : {type, duration: 1});
  assert.equal(validateRenderRequest({actions}).ok, true);
});

test('Vercel UI uses server-side realtime render proxy instead of static downloads', () => {
  const modal = readFileSync(new URL('../src/components/controls/RemotionVideoModal.tsx', import.meta.url), 'utf8');
  assert.equal(modal.includes("'/videos/lawnchair-showcase-"), false);
  assert.equal(modal.includes("fetch('/api/renders'"), true);
  assert.equal(existsSync(new URL('../src/app/api/renders/route.ts', import.meta.url)), true);
  assert.equal(existsSync(new URL('../src/app/api/renders/[id]/route.ts', import.meta.url)), true);
  assert.equal(existsSync(new URL('../src/app/api/renders/[id]/video/route.ts', import.meta.url)), true);
});

test('production renderer reuses a build-time Remotion bundle', () => {
  const server = readFileSync(new URL('../server/render-api.mjs', import.meta.url), 'utf8');
  const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(server.includes("from '@remotion/bundler'"), false);
  assert.equal(server.includes("'remotion-bundle'"), true);
  assert.equal(packageJson.scripts['build:renderer'].includes('build-remotion-bundle.mjs'), true);
});
