import { createServer } from 'node:http';
import { watch } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const development = process.argv.includes('--watch');
const clients = new Set();
const reloadScript = '<script data-portfolio-dev>new EventSource("/__dev/events").onmessage = () => location.reload();</script>';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (development && pathname === '/__dev/events') {
      response.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
      response.write(': connected\n\n');
      clients.add(response);
      response.on('close', () => clients.delete(response));
      return;
    }
    const file = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!file.startsWith(`${root}${path.sep}`) && file !== path.join(root, 'index.html')) { response.writeHead(403).end('Forbidden'); return; }
    let body = await readFile(file);
    if (development && path.extname(file) === '.html') body = body.toString('utf8').replace('</body>', `${reloadScript}</body>`);
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    response.end(body);
  } catch { response.writeHead(404).end('Not found'); }
});
if (development) {
  let reloadTimer;
  const watcher = watch(root, { recursive: true }, (event, filename) => {
    if (!filename || !/\.(html|css|js|svg)$/.test(String(filename))) return;
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(() => {
      for (const client of clients) client.write('data: reload\n\n');
    }, 200);
  });
  watcher.on('error', (error) => {
    console.error(`変更の監視が停止しました: ${error.message}`);
    process.exit(1);
  });
}

server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE'
    ? 'ポート4173は使用中です。起動済みの開発サーバーをCtrl+Cで停止してから、もう一度実行してください。'
    : `ローカルサーバーを起動できませんでした: ${error.message}`);
  process.exit(1);
});
server.listen(4173, '127.0.0.1', () => {
  console.log('Local: http://127.0.0.1:4173');
  if (development) console.log('編集内容を自動反映します。停止: Ctrl+C');
});
