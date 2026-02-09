import appMeta from '../config/app.meta';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// Type definition for API exposed from preload
declare global {
    interface Window {
        electronAPI: {
            sayHello: () => Promise<{ success: boolean; result?: string; error?: string }>;
        };
    }
}

const documentMeta = () => {
    // Set viewport meta
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(viewportMeta);

    // Set title
    document.title = appMeta.title;

    // Inject global styles
    const style = document.createElement('style');
    style.textContent = `
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background-color: #212121;
            color: #f2f2f2;
            min-height: 100vh;
        }
    `;
    document.head.appendChild(style);
};

const App: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    // Calls C++ function when component mounts
    useEffect(() => {
        window.electronAPI.sayHello().then(response => {
            if (response.success) {
                setMessage(response.result!);
            } else {
                setMessage(`Error: ${response.error}`);
            }
        });
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '24px' }}>
            {message}
        </div>
    );
};

// Inject meta tags and styles before mounting
documentMeta();

// Mounts React app to root element
const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App />);
}