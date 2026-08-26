import {randomUUID, timingSafeEqual} from 'node:crypto';

export const SUPPORTED_ACTIONS = new Set(['home', 'openDrawer', 'scrollDrawer', 'openApp', 'tap', 'wait', 'goHome']);
export const SUPPORTED_APPS = new Set(['calculator', 'camera', 'phone', 'settings', 'files', 'weather', 'clock']);

const safeEqual = (left, right) => {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && timingSafeEqual(a, b);
};

export const authorizeRequest = (authorization, apiKey) => {
  if (!apiKey || !authorization?.startsWith('Bearer ')) return false;
  return safeEqual(authorization.slice(7), apiKey);
};

export const validateRenderRequest = (body) => {
  if (body?.workflow !== undefined) {
    if (body.workflow !== 'facebook') return {ok: false, error: `unsupported workflow: ${body.workflow}`};
    return {
      ok: true,
      value: {
        workflow: 'facebook',
        compositionId: 'FacebookWorkflow',
        actions: [],
        fps: 30,
        durationInFrames: 600,
        width: 824,
        height: 1830,
      },
    };
  }
  if (!body || !Array.isArray(body.actions) || body.actions.length < 1 || body.actions.length > 100) {
    return {ok: false, error: 'actions must contain between 1 and 100 items'};
  }
  const fps = body.fps ?? 15;
  if (![15, 30, 60].includes(fps)) return {ok: false, error: 'fps must be 15, 30 or 60'};
  let totalSeconds = 0;
  const actions = [];
  for (const raw of body.actions) {
    if (!raw || !SUPPORTED_ACTIONS.has(raw.type)) return {ok: false, error: `unsupported action: ${raw?.type ?? 'missing'}`};
    const duration = raw.duration ?? 1;
    if (!Number.isFinite(duration) || duration < 0.25 || duration > 60) return {ok: false, error: 'each duration must be between 0.25 and 60 seconds'};
    if (raw.type === 'openApp' && !SUPPORTED_APPS.has(raw.app)) return {ok: false, error: `unsupported app: ${raw.app ?? 'missing'}`};
    if (raw.type === 'tap' && (typeof raw.value !== 'string' || raw.value.length > 64)) return {ok: false, error: 'tap value must be a string up to 64 characters'};
    totalSeconds += duration;
    actions.push({type: raw.type, duration, ...(raw.app ? {app: raw.app} : {}), ...(raw.value ? {value: raw.value} : {})});
  }
  if (totalSeconds > 300) return {ok: false, error: 'workflow may not exceed 300 seconds'};
  return {ok: true, value: {compositionId: 'ApiWorkflow', actions, fps, durationInFrames: Math.round(totalSeconds * fps), width: 412, height: 915}};
};

export const publicJob = (job) => {
  if (!job) return null;
  const {outputPath, request, ...safe} = job;
  return {...safe, ...(job.status === 'completed' ? {videoUrl: `/v1/renders/${job.id}/video`} : {})};
};

export const createJobStore = () => {
  const jobs = new Map();
  return {
    getActive() {
      return [...jobs.values()].find((job) => job.status === 'queued' || job.status === 'rendering') ?? null;
    },
    create(request) {
      const active = this.getActive();
      if (active) {
        const error = new Error('A video render is already in progress');
        error.statusCode = 409;
        error.activeJobId = active.id;
        throw error;
      }
      const now = new Date().toISOString();
      const job = {id: randomUUID(), status: 'queued', progress: 0, request, createdAt: now, updatedAt: now, outputPath: null, error: null};
      jobs.set(job.id, job);
      return job;
    },
    get(id) { return jobs.get(id) ?? null; },
    update(id, patch) {
      const current = jobs.get(id);
      if (!current) return null;
      const next = {...current, ...patch, updatedAt: new Date().toISOString()};
      jobs.set(id, next);
      return next;
    },
    delete(id) { return jobs.delete(id); },
    values() { return [...jobs.values()]; },
  };
};
