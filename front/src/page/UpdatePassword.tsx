import { useState } from 'react';
import { toast } from 'react-toastify';
import { toastConfig } from '../../shared/toastConfig';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../api/password';
import Button from '../components/Button';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const nav = useNavigate();
  const updatePw = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields', toastConfig);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match', toastConfig);
      return;
    }
    const response = await updatePassword(currentPassword, newPassword);
    console.log('response', response);
    if (response.status === 200) {
      toast.success(response.data, toastConfig);
      nav('/profile', { state: { toLogin: true } });
    } else toast.error('Wrong password', toastConfig);
  };
  return (
    <div className="w-100 bg-mainBlack bg-cover py-8 min-h-screen text-white flex justify-center items-center text-3xl bg-bottom flex-col gap-12">
      <div className="flex flex-col  justify-center items-center border-2 border-secYellow rounded-xl bg-white bg-opacity-20 p-8 backdrop-blur-sm">
        <div className="flex justify-center items-center flex-col gap-8">
          <h1>Update your password</h1>
          <input
            type="password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="px-4 py-2 text-mainYellow rounded-sm"
            placeholder="Current password"
          />
          <input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-4 py-2 text-mainYellow rounded-sm"
            pattern="
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            
            "
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
          <Button text="Update password" onClick={() => updatePw()} />
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
