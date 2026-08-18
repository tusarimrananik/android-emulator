import {NextRequest} from 'next/server';
import {proxyJson, rendererFetch} from '@/lib/render-api-proxy';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const response = await rendererFetch('/v1/renders', {
      method: 'POST',
      body: JSON.stringify(await request.json()),
    });
    return proxyJson(response);
  } catch (error) {
    return Response.json({error: error instanceof Error ? error.message : 'renderer unavailable'}, {status: 503});
  }
}
