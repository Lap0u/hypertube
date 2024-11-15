import { Bounce } from 'react-toastify';

export const API_URL = import.meta.env.VITE_API_URL;
export const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
export const REFRESH_TOKEN = import.meta.env.VITE_REFRESH_TOKEN;
export const toastConfig = {
  position: 'top-right' as const,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored' as const,
  transition: Bounce,
};
