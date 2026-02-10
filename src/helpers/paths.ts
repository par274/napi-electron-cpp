import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

export const __path = path;
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const require = createRequire(import.meta.url);