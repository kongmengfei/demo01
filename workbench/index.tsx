import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const container = document.getElementById('root')!;
const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <App name='demo01' />

    },
    {
        path: "webparts/:wpId",
        element: <NewNote />,
        action: Newaction
    }
]);
// Create a root.
const root = createRoot(container);

// Initial render: Render an element to the root.
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);