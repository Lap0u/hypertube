import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SingUpForm';
import { FaGoogle } from 'react-icons/fa';
import { Si42 } from 'react-icons/si';

const Login = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.toSignin !== undefined) {
      setToLogin(location.state.toSignin);
    }
  }, [location.state?.toSignin]);

  const [toLogin, setToLogin] = useState<boolean>(true);
  return (
    <div
      className="w-100 bg-mainBlack bg-cover py-8 min-h-screen
     text-white flex justify-center items-center text-3xl bg-bottom flex-col gap-12">
      <h1 className="text-[9rem] custom-font text-red-600 p-12 ">Hypratube</h1>
      <div className="flex flex-col  justify-center items-center border-2 border-secYellow rounded-xl bg-white bg-opacity-20 p-8 backdrop-blur-sm">
        {toLogin ? (
          <div className="flex justify-center items-center flex-col gap-8">
            <LoginForm />
            <p onClick={() => setToLogin((prev) => !prev)}>
              No account yet?{' '}
              <span className="hover:text-secYellow cursor-pointer">
                Sign-up.
              </span>
            </p>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-8">
            <SignUpForm />
            <p onClick={() => setToLogin((prev) => !prev)}>
              Already have an account?{' '}
              <span className="hover:text-secYellow  cursor-pointer">
                Login.
              </span>
            </p>
          </div>
        )}
        <div className="flex gap-x-16 justify-center items-center pt-8">
          <div
            className="border-secYellow bg-secYellow border-2 rounded-md px-6 py-3 cursor-pointer hover:bg-secMarine"
            onClick={() => alert('42 Auth')}>
            <Si42 />
          </div>
          <div
            className="border-secYellow bg-secYellow border-2 rounded-md px-6 py-3 cursor-pointer hover:bg-secMarine"
            onClick={() => alert('Google Auth')}>
            <FaGoogle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
