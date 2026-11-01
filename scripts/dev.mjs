import { spawn, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
let tailwind;
try {
  const manifest = require.resolve('@tailwindcss/cli/package.json');
  const { bin } = JSON.parse(readFileSync(manifest, 'utf8'));
  tailwind = path.resolve(path.dirname(manifest), bin.tailwindcss);
} catch {
  console.error('Tailwind CSSが見つかりません。npm ci を実行してください。');
  process.exit(1);
}

const cssArguments = [tailwind, '-i', './src/styles.css', '-o', './dist/assets/styles.css', '--minify'];
const initialBuild = spawnSync(process.execPath, cssArguments, { cwd: root, stdio: 'inherit' });
if (initialBuild.status !== 0) process.exit(initialBuild.status ?? 1);

const children = new Set();
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  process.exitCode = code;
  for (const child of children) child.kill('SIGTERM');
}

function start(argumentsList) {
  const child = spawn(process.execPath, argumentsList, { cwd: root, stdio: 'inherit' });
  children.add(child);
  child.on('error', (error) => {
    console.error(`開発プロセスを起動できませんでした: ${error.message}`);
    children.delete(child);
    stop(1);
  });
  child.on('exit', (code) => {
    children.delete(child);
    if (!stopping) stop(code ?? 1);
  });
}

process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
start([...cssArguments, '--watch=always']);
start([fileURLToPath(new URL('./preview.mjs', import.meta.url)), '--watch']);
