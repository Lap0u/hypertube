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
import RootLayout from './components/RootLayout.tsx';
import UsersPage from './page/Users.tsx';
import Search from './page/Search.tsx';
import ForgetPassword from './page/ForgetPassword.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/users',
        element: <UsersPage />,
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
        path: '/forget-password/:token',
        element: <ForgetPassword />,
      },
      {
        path: '/stream/:torrentHash',
        element: <Stream />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
