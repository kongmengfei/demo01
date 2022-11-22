import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App, { Apploader } from "./component/App";
import ErrorPage from './component/ErrorPage';
const container = document.getElementById('root')!;
let router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <App name='demo01' />,
        loader: Apploader,
        children: [
            {
                path: "new",
                element: <NewNote />,
                action: newNoteAction,
            },
            {
                path: "note/:noteId",
                element: <Note />,
                loader: noteLoader,
                action: noteAction,
                errorElement: <h2>Note not found</h2>,
            },
        ]
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