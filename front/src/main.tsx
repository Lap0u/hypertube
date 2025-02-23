import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppContextProvider from './components/AppContextProvider.tsx';
import RootLayout from './components/RootLayout.tsx';
import Page404 from './page/404.tsx';
import ForgetPassword from './page/ForgetPassword.tsx';
import Home from './page/Home.tsx';
import Library from './page/Library.tsx';
import Login from './page/Login.tsx';
import Movie from './page/Movie.tsx';
import Profile from './page/Profile.tsx';
import Search from './page/Search.tsx';
import Stream from './page/Stream.tsx';
import UpdatePassword from './page/UpdatePassword.tsx';
import UsersPage from './page/Users.tsx';

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
        path: '/forget-password/:token',
        element: <ForgetPassword />,
      },
      {
        path: '/update-password',
        element: <UpdatePassword />,
      },
      {
        path: '/stream/:torrentHash/:imdbId',
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
  <AppContextProvider>
    <RouterProvider router={router} />
    <ToastContainer />
  </AppContextProvider>
);
