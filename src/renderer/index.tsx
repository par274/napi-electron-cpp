import type { SayHelloResponse } from '../types';

import appMeta from '../../config/app.meta';
import './styles/app.css';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (!window.electronAPI) {
            setMessage('Error: Electron API not available');
            return;
        }

        window.electronAPI.sayHello().then((response: SayHelloResponse) => {
            if (response.success) setMessage(response.result!);
            else setMessage(`Error: ${response.error}`);
        });
    }, []);

    return <div className="app-container">{message}</div>;
};

// Inject viewport and title meta
const viewportMeta = document.createElement('meta');
viewportMeta.name = 'viewport';
viewportMeta.content = 'width=device-width, initial-scale=1.0';
document.head.appendChild(viewportMeta);

document.title = appMeta.title;

// Mount React app
const rootElement = document.getElementById('root');
if (rootElement) createRoot(rootElement).render(<App />);