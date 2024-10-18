import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Library from './page/Library.tsx';
import Profile from './page/Profile.tsx';
import Menu from './components/Menu.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
    <Menu />
    <RouterProvider router={router} />
  </StrictMode>
);
