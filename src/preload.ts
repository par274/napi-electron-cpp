const { contextBridge, ipcRenderer } = require('electron');

// Provides secure access from renderer to main process
contextBridge.exposeInMainWorld('electronAPI', {
    sayHello: () => ipcRenderer.invoke('sayHello')
});