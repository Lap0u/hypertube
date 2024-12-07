import { Bounce } from 'react-toastify';

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
