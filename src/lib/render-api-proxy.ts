const rendererUrl = () => {
  const value = process.env.RENDERER_API_URL;
  if (!value) throw new Error('RENDERER_API_URL is not configured');
  return value.replace(/\/$/, '');
};

const headers = (withJson = false) => {
  const key = process.env.RENDERER_API_KEY;
  if (!key) throw new Error('RENDERER_API_KEY is not configured');
  return {
    authorization: `Bearer ${key}`,
    ...(withJson ? {'content-type': 'application/json'} : {}),
  };
};

export const rendererFetch = (path: string, init: RequestInit = {}) =>
  fetch(`${rendererUrl()}${path}`, {
    ...init,
    headers: {...headers(Boolean(init.body)), ...(init.headers ?? {})},
    cache: 'no-store',
  });

export const proxyJson = async (response: Response) =>
  new Response(await response.text(), {
    status: response.status,
    headers: {'content-type': response.headers.get('content-type') ?? 'application/json'},
  });
