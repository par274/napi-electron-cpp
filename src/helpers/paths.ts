import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

export const __path = path;
export const require = createRequire(import.meta.url);

export const __filename = fileURLToPath(import.meta.url);
export const appDir = path.dirname(__filename);