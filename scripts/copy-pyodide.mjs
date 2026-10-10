// Copies the Pyodide runtime into public/ so the site serves its own Python
// (no CDN, and the version always matches the installed npm package).
import { cpSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const src = 'node_modules/pyodide';
const dest = 'public/pyodide';
const skip = /\.(map|html|d\.ts)$|^README|^package\.json$/;

mkdirSync(dest, { recursive: true });
for (const file of readdirSync(src)) {
    if (!skip.test(file)) cpSync(join(src, file), join(dest, file));
}
console.log(`Copied Pyodide runtime to ${dest}`);
