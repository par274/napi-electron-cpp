import appMeta from '../config/app.meta';
import './styles.css';

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
};

const App: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    // Calls C++ function when component mounts
    useEffect(() => {
        if (!window.electronAPI) {
            setMessage('Error: Electron API not available');
            return;
        }
        window.electronAPI.sayHello().then(response => {
            if (response.success) {
                setMessage(response.result!);
            } else {
                setMessage(`Error: ${response.error}`);
            }
        });
    }, []);

    return (
        <div className="app-container">
            {message}
        </div>
    );
};

// Inject meta tags before mounting
documentMeta();

// Mounts React app to root element
const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App />);
}