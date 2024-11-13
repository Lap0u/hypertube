import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Page404 = () => {
  const nav = useNavigate();
  const goHome = () => {
    nav('/');
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-mainMarine gap-24">
      <h1 className="text-6xl text-white">404 Not found</h1>
      <img src="/404.jpg  " alt="Peugeot 404" />
      <Button text="Back to safety" onClick={() => goHome()} />
    </div>
  );
};

export default Page404;
