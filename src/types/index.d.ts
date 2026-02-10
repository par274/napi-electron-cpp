export interface SayHelloResponse {
    success: boolean;
    result?: string;
    error?: string;
}

export interface ElectronAPI {
    sayHello: () => Promise<SayHelloResponse>;
}

// global window interface
declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}