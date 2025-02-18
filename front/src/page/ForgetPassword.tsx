import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useState } from 'react';
import { resetPassword } from '../api/password';
import { toastConfig } from '../../shared/toastConfig';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { token } = useParams();
  const nav = useNavigate();
  if (!token) {
    toast.error('Invalid token', toastConfig);
    nav('/login');
    return;
  }
  const resetPw = async () => {
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields', toastConfig);
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', toastConfig);
      return;
    }
    const response = await resetPassword(password, token);
    if (response.status === 201) {
      toast.success(response.data, toastConfig);
      nav('/login', { state: { toLogin: true } });
    } else toast.error(response.data || 'An error occurred', toastConfig);
    if (response.status === 401) nav('/login', { state: { toLogin: false } });
  };

  return (
    <div className="w-100 bg-mainBlack bg-cover py-8 min-h-screen text-white flex justify-center items-center text-3xl bg-bottom flex-col gap-12">
      <div className="flex flex-col  justify-center items-center border-2 border-secYellow rounded-xl bg-white bg-opacity-20 p-8 backdrop-blur-sm">
        <div className="flex justify-center items-center flex-col gap-8">
          <h1>Reset your password</h1>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            pattern="
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            
            "
            className="px-4 py-2 text-mainYellow rounded-sm"
            placeholder="New password"
          />
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 text-mainYellow rounded-sm"
            pattern="
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            
            "
            placeholder="Confirm password"
          />
          <Button text="Reset" onClick={() => resetPw()} />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
