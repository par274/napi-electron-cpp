import { app } from 'electron';
import fs from 'fs';

import { __path, __filename, require } from './helpers/paths';

let nativeAddon: any = null;

export async function loadNativeAddon(): Promise<boolean> {
    const archFolder = process.arch === 'arm64' ? 'arm64' : 'x64';

    const possiblePaths = [
        __path.join(app.getAppPath(), `build/${archFolder}/Release/hello.node`),
        __path.join(app.getAppPath(), `build/cmake-js/Release/hello.node`),
    ];

    for (const addonPath of possiblePaths) {
        try {
            if (fs.existsSync(addonPath)) {
                nativeAddon = require(addonPath);
                console.log("Native addon loaded from:", addonPath);
                return true;
            }
        } catch (err) {
            console.error("Failed to load from", addonPath, err);
        }
    }

    return false;
}

export { nativeAddon };