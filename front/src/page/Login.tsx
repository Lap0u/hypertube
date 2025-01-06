import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Si42 } from 'react-icons/si';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../../shared/constants';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { forgetPassword } from '../api/password';
import { toast } from 'react-toastify';
import { toastConfig } from '../../shared/toastConfig';

const Login = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.toLogin !== undefined) {
      setToLogin(location.state.toLogin);
    }
    if (location.state?.login !== undefined) {
      setLogin(location.state.login);
    }
  }, [location.state?.toLogin, location.state?.login]);
  const resetPassword = async () => {
    const email = prompt('Please enter your email');
    if (!email) return;
    const response = await forgetPassword(email);
    if (response.status === 201) {
      console.log(response);
      toast.success(response.data, toastConfig);
    } else {
      toast.error(response.data || 'An error occurred', toastConfig);
    }
  };
  const [toLogin, setToLogin] = useState<boolean>(true);
  const [login, setLogin] = useState<string>('');
  return (
    <div
      className="w-100 bg-mainBlack bg-cover py-2 md:py-8
     text-white flex justify-center items-center text-xl md:text-3xl bg-bottom flex-col gap-12">
      <div className="flex flex-col  justify-center items-center border-2 border-secYellow rounded-xl bg-white bg-opacity-20 md:p-8 p-2 backdrop-blur-sm">
        {toLogin ? (
          <div className="flex justify-center items-center flex-col gap-8">
            <LoginForm login={login} />
            <p onClick={() => setToLogin((prev) => !prev)}>
              No account yet?{' '}
              <span className="hover:text-secYellow cursor-pointer">
                Sign-up.
              </span>
            </p>
            <p onClick={() => resetPassword()}>
              Forgot password?{' '}
              <span className="hover:text-secYellow cursor-pointer">
                Reset password.
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
            onClick={() => window.location.replace(API_URL + '/auth/42')}>
            <Si42 />
          </div>
          <div
            className="border-secYellow bg-secYellow border-2 rounded-md px-6 py-3 cursor-pointer hover:bg-secMarine"
            onClick={() => window.location.replace(API_URL + '/auth/google')}>
            <FaGoogle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
