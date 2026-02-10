import { IPC } from "./ipc";
import type { SayHelloResponse } from "./types";

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    sayHello: (): Promise<SayHelloResponse> => ipcRenderer.invoke(IPC.SAY_HELLO),
});