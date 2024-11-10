import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Library from './page/Library.tsx';
import Profile from './page/Profile.tsx';
import Login from './page/Login.tsx';
import Home from './page/Home.tsx';
import { ToastContainer } from 'react-toastify';

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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Menu /> */}
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
