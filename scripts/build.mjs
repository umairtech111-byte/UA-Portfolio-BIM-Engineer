import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, 'assets'), resolve(output, 'assets'), { recursive: true });

await build({
  entryPoints: [resolve(root, 'src/blob-client.js')],
  outfile: resolve(output, 'assets/js/blob-client.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  minify: true,
});

const html = await readFile(resolve(root, 'index.html'), 'utf8');
await writeFile(resolve(output, 'index.html'), html);

console.log('Built static site in dist/');
