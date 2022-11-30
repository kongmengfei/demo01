import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../src/Common/component/ErrorPage';
import Preview from './component/Preview';
import WebpartList from './component/WebpartList';


const container = document.getElementById('root')!;
const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <WebpartList />
    },
    {
        path: "webparts/:wpId",
        element: <Preview />,
        errorElement: <ErrorPage />
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