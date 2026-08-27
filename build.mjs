import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('.');
const dist = resolve(root, 'dist');
const serverDir = resolve(dist, 'server');
const metaDir = resolve(dist, '.openai');

await mkdir(serverDir, { recursive: true });
await mkdir(metaDir, { recursive: true });

const [html, css, js] = await Promise.all([
  readFile(resolve(root, 'index.html'), 'utf8'),
  readFile(resolve(root, 'styles.css'), 'utf8'),
  readFile(resolve(root, 'app.js'), 'utf8'),
]);

const bundledHtml = html
  .replace(
    '<link rel="stylesheet" href="styles.css" />',
    `<style>\n${css}\n</style>`,
  )
  .replace('<script src="app.js"></script>', `<script>\n${js}\n</script>`);

await writeFile(
  resolve(serverDir, 'index.js'),
  `const html = ${JSON.stringify(bundledHtml)};\n\nexport default {\n  async fetch(request) {\n    const url = new URL(request.url);\n    if (url.pathname === '/healthz') {\n      return new Response('ok', { status: 200 });\n    }\n    return new Response(html, {\n      status: 200,\n      headers: { 'content-type': 'text/html; charset=utf-8' },\n    });\n  },\n};\n`,
);

await writeFile(
  resolve(metaDir, 'hosting.json'),
  JSON.stringify({ project_id: 'appgprj_6a903d20199481918b943e84c46ec31b' }, null, 2),
);

