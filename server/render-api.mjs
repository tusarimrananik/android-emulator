import http from 'node:http';
import {createReadStream, existsSync, mkdirSync, rmSync} from 'node:fs';
import {stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderMedia, selectComposition} from '@remotion/renderer';
import {authorizeRequest, createJobStore, publicJob, validateRenderRequest} from './render-api-core.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const outputDir=process.env.RENDER_OUTPUT_DIR||path.join(root,'render-output');
const port=Number(process.env.PORT||8787);
const host=process.env.HOST||'0.0.0.0';
const apiKey=process.env.RENDER_API_KEY||'';
const allowedOrigin=process.env.ALLOWED_ORIGIN||'*';
const ttlMs=Number(process.env.RENDER_TTL_MS||86400000);
mkdirSync(outputDir,{recursive:true});

const store=createJobStore();
let working=false;
const serveUrl=path.join(root,'remotion-bundle');
if(!existsSync(path.join(serveUrl,'index.html'))) throw new Error('Remotion bundle is missing. Run npm run build:renderer first.');

const corsHeaders=(origin)=>({'access-control-allow-origin':allowedOrigin==='*'?'*':origin===allowedOrigin?origin:allowedOrigin,'access-control-allow-headers':'authorization, content-type','access-control-allow-methods':'GET, POST, OPTIONS','cache-control':'no-store'});
const json=(res,status,body,origin)=>{res.writeHead(status,{'content-type':'application/json; charset=utf-8',...corsHeaders(origin)});res.end(JSON.stringify(body));};
const readJson=async(req)=>{const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>256_000)throw new Error('request too large');chunks.push(chunk);}return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}');};

const processJob=async(id)=>{if(working)return;const job=store.get(id);if(!job)return;working=true;try{store.update(id,{status:'rendering',progress:0});const inputProps={actions:job.request.actions,fps:job.request.fps};const composition=await selectComposition({serveUrl,id:'ApiWorkflow',inputProps});const outputPath=path.join(outputDir,`${id}.webm`);await renderMedia({serveUrl,composition,inputProps,codec:'vp8',crf:10,outputLocation:outputPath,onProgress:({progress})=>store.update(id,{progress:Math.max(0,Math.min(1,progress))})});store.update(id,{status:'completed',progress:1,outputPath});}catch(error){console.error('[renderer] Job failed',id,error);store.update(id,{status:'failed',error:error instanceof Error?error.message:'render failed'});}finally{working=false;}};

const cleanup=()=>{const now=Date.now();for(const job of store.values()){if(now-Date.parse(job.updatedAt)<ttlMs)continue;if(job.outputPath&&existsSync(job.outputPath))rmSync(job.outputPath,{force:true});store.delete(job.id);}};
setInterval(cleanup,Math.min(ttlMs,3600000)).unref();

const server=http.createServer(async(req,res)=>{const origin=req.headers.origin||'';if(req.method==='OPTIONS'){res.writeHead(204,corsHeaders(origin));return res.end();}const url=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);if(url.pathname==='/health'){return json(res,200,{ok:true,service:'android-workflow-renderer',working,activeJobId:store.getActive()?.id??null},origin);}if(!authorizeRequest(req.headers.authorization,apiKey))return json(res,401,{error:'unauthorized'},origin);
 try{
  if(req.method==='POST'&&url.pathname==='/v1/renders'){const validation=validateRenderRequest(await readJson(req));if(!validation.ok)return json(res,400,{error:validation.error},origin);const job=store.create(validation.value);void processJob(job.id);return json(res,202,{job:publicJob(job)},origin);}
  const match=url.pathname.match(/^\/v1\/renders\/([0-9a-f-]+)(\/video)?$/i);if(match){const job=store.get(match[1]);if(!job)return json(res,404,{error:'job not found'},origin);if(!match[2])return json(res,200,{job:publicJob(job)},origin);if(job.status!=='completed'||!job.outputPath||!existsSync(job.outputPath))return json(res,409,{error:'video is not ready'},origin);const info=await stat(job.outputPath);res.writeHead(200,{'content-type':'video/webm','content-length':info.size,'content-disposition':`attachment; filename="android-workflow-${job.id}.webm"`,...corsHeaders(origin)});return createReadStream(job.outputPath).pipe(res);}
  return json(res,404,{error:'not found'},origin);
 }catch(error){const statusCode=Number(error?.statusCode)||400;return json(res,statusCode,{error:error instanceof Error?error.message:'bad request',...(error?.activeJobId?{activeJobId:error.activeJobId}:{})},origin);}
});

server.listen(port,host,()=>console.log(`[renderer] Listening on ${host}:${port}`));
const shutdown=()=>server.close(()=>process.exit(0));process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
