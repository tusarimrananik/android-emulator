import {rendererFetch} from '@/lib/render-api-proxy';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, {params}: {params: {id: string}}) {
  try {
    const upstream = await rendererFetch(`/v1/renders/${encodeURIComponent(params.id)}/video`);
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') ?? 'application/json',
        ...(upstream.headers.get('content-length') ? {'content-length': upstream.headers.get('content-length')!} : {}),
        ...(upstream.headers.get('content-disposition') ? {'content-disposition': upstream.headers.get('content-disposition')!} : {}),
      },
    });
  } catch (error) {
    return Response.json({error: error instanceof Error ? error.message : 'renderer unavailable'}, {status: 503});
  }
}
