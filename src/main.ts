import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let nativeAddon: any;

// Attempts to load native C++ addon from multiple paths
function tryLoadNativeAddon() {
    const possiblePaths = [
        path.join(__dirname, '../build/x64/Release/hello.node'),
        path.join(process.resourcesPath, 'build/x64/Release/hello.node'),
        path.join(app.getAppPath(), 'build/x64/Release/hello.node'),
        path.join(__dirname, '../../build/x64/Release/hello.node'),
    ];

    for (const addonPath of possiblePaths) {
        try {
            if (fs.existsSync(addonPath)) {
                nativeAddon = require(addonPath);
                console.log('Native addon loaded from:', addonPath);
                return true;
            }
        } catch (error) {
            console.error('Failed to load from', addonPath, error);
        }
    }

    return false;
}

// Creates window when app is ready
app.whenReady().then(() => {
    const loaded = tryLoadNativeAddon();
    if (!loaded) {
        dialog.showErrorBox('Native Addon Error', 'Failed to load native addon.');
        app.quit();
    }

    Menu.setApplicationMenu(null);

    // Creates main application window
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
});

// IPC handler - forwards sayHello request from renderer to C++ addon
ipcMain.handle('sayHello', async () => {
    try {
        return { success: true, result: nativeAddon.sayHello() };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});