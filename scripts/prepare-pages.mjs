import { copyFile, mkdir, mkdtemp, readdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as content from '../dist/assets/content.js';

const source = fileURLToPath(new URL('../dist/', import.meta.url));
const destination = await mkdtemp(path.join(tmpdir(), 'portfolio-pages-'));
const projects = content.projects.filter((project) => project.isHidden !== true);

async function copyStaticFiles(directory = '') {
  const entries = await readdir(path.join(source, directory), { withFileTypes: true });
  for (const entry of entries) {
    const relative = path.posix.join(directory, entry.name);
    if (entry.name.startsWith('.') || relative === 'assets/works' || relative === 'assets/content.js') continue;
    if (entry.isDirectory()) {
      await mkdir(path.join(destination, relative), { recursive: true });
      await copyStaticFiles(relative);
    } else if (entry.isFile()) {
      await copyFile(path.join(source, relative), path.join(destination, relative));
    } else {
      throw new Error(`Unsupported asset: ${relative}`);
    }
  }
}

await copyStaticFiles();
const images = new Set(projects.flatMap((project) => [project.image, ...(project.images || []).map((image) => image.src)]).filter(Boolean));
for (const image of images) {
  if (/^https?:\/\//i.test(image)) continue;
  const relative = path.posix.normalize(image.replace(/^\.\//, ''));
  if (!relative.startsWith('assets/') || relative.includes('..') || relative.includes('\\')) {
    throw new Error(`Invalid local image path: ${image}`);
  }
  const target = path.join(destination, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(path.join(source, relative), target);
}
const publicContent = Object.entries({ ...content, projects })
  .map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`)
  .join('\n\n');
await writeFile(path.join(destination, 'assets/content.js'), `${publicContent}\n`);
console.log(`directory=${destination}`);
