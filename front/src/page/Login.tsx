import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SigninForm from '../components/SigninForm';

const Login = () => {
  const location = useLocation();
  let toSignin = true;
  if (location.state !== undefined && location.state.toSignin !== undefined) {
    toSignin = location.state.toSignin;
  }
  const [toLogin, setToLogin] = useState<boolean>(toSignin);
  return (
    <div
      className="w-100 bg-black bg-cover py-8 min-h-screen
     text-white flex justify-center items-center text-3xl bg-bottom flex-col gap-12">
      <h1 className="text-[7rem] custom-font text-red-600 p-12 ">Hypratube</h1>
      <div className="flex justify-center items-center border-2 border-white rounded-xl bg-white bg-opacity-20 p-8 backdrop-blur-sm">
        {toLogin ? (
          <div className="flex justify-center items-center flex-col gap-8">
            <LoginForm />
            <p onClick={() => setToLogin((prev) => !prev)}>
              No account yet?{' '}
              <span className="hover:text-red-600 cursor-pointer">
                Sign-up.
              </span>
            </p>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-8">
            <SigninForm />
            <p onClick={() => setToLogin((prev) => !prev)}>
              Already have an account?{' '}
              <span className="hover:text-red-600 cursor-pointer">Login.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
