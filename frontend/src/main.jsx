/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import UserProvider from './contexts/UserContext.jsx';
// Pages import
import ErrorPage from './error-page.jsx';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home/home.jsx';
import Course from './pages/course/course.jsx';
import Review from './pages/review/review.jsx';
import Search from './pages/search/search.jsx';
import SavedCourse from './pages/saved-courses/saved-courses.jsx';

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
        path: 'review/:course',
        element: <Review />,
      },
      {
        path: 'search',
        element: <Search />,
      },
	  {
		path: 'saved-courses',
		element: 
			<ProtectedRoute>
				<SavedCourse />
			</ProtectedRoute>,
	  }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
);
