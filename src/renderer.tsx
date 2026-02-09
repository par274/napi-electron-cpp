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

// Mounts React app to root element
const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App />);
}