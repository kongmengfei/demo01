import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App, { Apploader } from "./component/App";
import ErrorPage from './component/ErrorPage';
import NewNote, { Newaction } from './component/New';
import Note, { Noteaction, Noteloader } from './component/Note';

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
                action: Newaction
            },
            {
                path: "note/:noteId",
                element: <Note />,
                loader: Noteloader,
                action: Noteaction,
                errorElement: <h2>Note not found</h2>,
            }
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