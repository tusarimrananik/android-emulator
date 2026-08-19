import path from 'node:path';
import {bundle} from '@remotion/bundler';

const root=process.cwd();
const outDir=path.join(root,'remotion-bundle');
console.log('[renderer-build] Bundling Remotion project...');
await bundle({
  entryPoint:path.join(root,'src/remotion/index.ts'),
  outDir,
  webpackOverride:(config)=>({...config,resolve:{...config.resolve,alias:{...(config.resolve?.alias||{}),'@':path.join(root,'src')}}}),
});
console.log(`[renderer-build] Bundle ready at ${outDir}`);
