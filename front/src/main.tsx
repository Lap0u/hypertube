import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Library from './page/Library.tsx';
import Profile from './page/Profile.tsx';
import Login from './page/Login.tsx';
import Home from './page/Home.tsx';
import { ToastContainer } from 'react-toastify';
import Page404 from './page/404.tsx';
import Test from './page/test.tsx';
import Movie from './page/Movie.tsx';
import Stream from './page/Stream.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/library',
    element: <Library />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/movie/:imdbId',
    element: <Movie />,
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/stream/:torrentHash',
    element: <Stream />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
