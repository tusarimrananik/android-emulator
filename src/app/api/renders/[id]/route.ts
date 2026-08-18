import {proxyJson, rendererFetch} from '@/lib/render-api-proxy';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, {params}: {params: {id: string}}) {
  try {
    return proxyJson(await rendererFetch(`/v1/renders/${encodeURIComponent(params.id)}`));
  } catch (error) {
    return Response.json({error: error instanceof Error ? error.message : 'renderer unavailable'}, {status: 503});
  }
}
