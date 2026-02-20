import { loadNativeAddon, nativeAddon } from './addon';
import { handleSayHello } from './functions/sayHello';

import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import path from 'path';
import { IPC } from './ipc';

app.whenReady().then(async () => {
    const loaded = await loadNativeAddon();
    if (!loaded) {
        dialog.showErrorBox("Native Addon Error", "Failed to load native addon.");
        app.quit();
        return;
    }

    Menu.setApplicationMenu(null);

    const mainWindow = new BrowserWindow({
        frame: false,
        fullscreen: true,
        webPreferences: {
            preload: path.join(app.getAppPath(), "dist/preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    // For debugging purposes
    // mainWindow.webContents.openDevTools();

    mainWindow.loadFile(path.join(app.getAppPath(), "dist/index.html"));
});

// IPC handlers
ipcMain.handle(IPC.SAY_HELLO, handleSayHello);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});