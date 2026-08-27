import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve('.');
const dist = resolve(root, 'dist');
const serverDir = resolve(dist, 'server');
const metaDir = resolve(dist, '.openai');

await mkdir(serverDir, { recursive: true });
await mkdir(metaDir, { recursive: true });

for (const file of ['index.html', 'styles.css', 'app.js']) {
  await copyFile(resolve(root, file), resolve(dist, file));
}

await writeFile(
  resolve(serverDir, 'index.js'),
  `export default {\n  async fetch(request) {\n    const url = new URL(request.url);\n    if (url.pathname === '/healthz') {\n      return new Response('ok', { status: 200 });\n    }\n    return new Response('Smart Ambulance Navigation', {\n      status: 200,\n      headers: { 'content-type': 'text/plain; charset=utf-8' },\n    });\n  },\n};\n`,
);

await writeFile(
  resolve(metaDir, 'hosting.json'),
  JSON.stringify({ project_id: 'appgprj_6a903d20199481918b943e84c46ec31b' }, null, 2),
);

await writeFile(
  resolve(dist, 'README.txt'),
  'Build output for Smart Ambulance Navigation',
);

