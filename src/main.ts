import { app, BrowserWindow, ipcMain, dialog, Menu } from "electron";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let nativeAddon: any;

// Attempts to load native C++ addon from multiple paths (ESM-safe)
async function tryLoadNativeAddon(): Promise<boolean> {
    const possiblePaths = [
        path.join(__dirname, "../build/x64/Release/hello.node"),
        path.join(process.resourcesPath, "build/x64/Release/hello.node"),
        path.join(app.getAppPath(), "build/x64/Release/hello.node"),
        path.join(__dirname, "../../build/x64/Release/hello.node"),
    ];

    for (const addonPath of possiblePaths) {
        try {
            if (fs.existsSync(addonPath)) {
                nativeAddon = require(addonPath);
                console.log("Native addon loaded from:", addonPath);
                return true;
            }
        } catch (error) {
            console.error("Failed to load from", addonPath, error);
        }
    }

    return false;
}

// Creates window when app is ready
app.whenReady().then(async () => {
    try {
        const loaded = await tryLoadNativeAddon();
        if (!loaded) {
            dialog.showErrorBox(
                "Native Addon Error",
                "Failed to load native addon."
            );
            app.quit();
            return;
        }

        Menu.setApplicationMenu(null);

        const mainWindow = new BrowserWindow({
            width: 1280,
            height: 900,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                contextIsolation: true,
                nodeIntegration: false,
            },
        });

        // For debugging purposes
        // mainWindow.webContents.openDevTools();

        mainWindow.loadFile(path.join(__dirname, "src/index.html"));
    } catch (err) {
        console.error("Fatal error during app startup:", err);
        app.quit();
    }
});

// IPC handler: forwards sayHello request from renderer to C++ addon
ipcMain.handle("sayHello", async () => {
    try {
        return {
            success: true,
            result: nativeAddon.sayHello(),
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
        };
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});