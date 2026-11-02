import { copyFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const splideRoot = path.dirname(require.resolve('@splidejs/splide/package.json'));
const destination = fileURLToPath(new URL('../dist/assets/vendor/', import.meta.url));

mkdirSync(destination, { recursive: true });
copyFileSync(path.join(splideRoot, 'dist/js/splide.esm.js'), path.join(destination, 'splide.esm.js'));
copyFileSync(path.join(splideRoot, 'LICENSE'), path.join(destination, 'splide-LICENSE.txt'));
