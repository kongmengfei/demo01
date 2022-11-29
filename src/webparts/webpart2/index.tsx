import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')!;

// Create a root.
const root = createRoot(container);

// Initial render: Render an element to the root.
root.render(
    <React.StrictMode>
        <div>this is separated webpart2</div>
    </React.StrictMode>
);