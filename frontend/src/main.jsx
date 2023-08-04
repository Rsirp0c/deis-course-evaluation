/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom'

// import { useState } from 'react';
import UserProvider from './contexts/userContext';
// Pages import
import ErrorPage from './error-page.jsx'
import Layout from './components/Layout.jsx';
import Home from './pages/home/Home.jsx'
import Course from './pages/course/course.jsx'
import RatingForm from './pages/rating-form/rating-form.jsx'
import Search from './pages/search/search.jsx'
// import Search, { Loader as searchLoader } from './pages/search.jsx'


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
				path: '/course',
				element: <Course />,
			},
			{
				path: 'rating-form',
				element: <RatingForm />,
			},
			{
				path: 'search',
				element: <Search />,
				// loader: searchLoader
			},

		],
	}
])



ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	</React.StrictMode>,
);
