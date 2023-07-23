/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom'

import ErrorPage from './error-page.jsx'
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'


const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/register',
				element: <Register />,
			}
		],
	}
])


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
