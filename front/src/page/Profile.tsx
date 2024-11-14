import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { SignUpData } from '../dtos/SignupData';
import Cookies from 'js-cookie';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { updateUser } from '../api/user';
import { ACCESS_TOKEN } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';
import MainTitle from '../components/MainTitle';

const toastConfig = {
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
const Profile = () => {
  //a remettre quand le cookie sera bien set
  // const nav = useNavigate();
  // useEffect(() => {
  //   const access = Cookies.get(ACCESS_TOKEN);
  //   if (!access) {
  //     nav('/login');
  //   }
  // }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null); // Store the file
  const [preview, setPreview] = useState<string>();

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('email', data.email);
    formData.append('firstName', data.firstName ?? '');
    formData.append('lastName', data.lastName ?? '');
    formData.append('preferredLanguage', data.preferredLanguage ?? 'string');
    if (file) {
      formData.append('profilePicture', file);
    }
    const response = await updateUser(formData);
    console.log('form resp', response);
    if (response?.status === 200) {
      toast.success(response.data, toastConfig);
    } else {
      toast.error(response?.data || 'An error occurred', toastConfig);
    }
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile); // Store the selected file
    const urlImage = URL.createObjectURL(selectedFile);
    setPreview(urlImage);
  };

  const uploadImage = (e: React.MouseEvent) => {
    e.preventDefault();
    hiddenInputRef.current?.click();
  };

  return (
    <div className="w-screen min-g-screen flex justify-center items-center bg-mainBlack flex-col min-h-screen">
      <MainTitle />
      <div className="flex flex-col  justify-center items-center border-2 border-secYellow rounded-xl bg-white bg-opacity-20 p-8 backdrop-blur-sm">
        <form
          className="flex flex-col gap-y-8 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-x-16 justify-center items-start">
            <div className="flex flex-col gap-y-8 px-4 py-8 justify-center items-center">
              <input
                type="text"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="username*"
                {...register('username', { required: true })}
              />
              {errors.username && (
                <span className="text-xl mt-[-12px] text-red-600">
                  This field is required
                </span>
              )}
              <input
                type="text"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="firstName"
                {...register('firstName', { required: false })}
              />
              {errors.firstName && (
                <span className="text-xl mt-[-12px] text-red-600">
                  This field is required
                </span>
              )}
              <input
                type="text"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="lastName"
                {...register('lastName', { required: false })}
              />
              {errors.lastName && (
                <span className="text-xl mt-[-12px] text-red-600">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-y-8 px-4 py-8 justify-center items-center">
              <input
                type="email"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="email*"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <span className="text-xl mt-[-12px] text-red-600">
                  This field is required
                </span>
              )}
              <input
                type="password"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;*"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <span className="text-xl mt-[-12px] text-red-600">
                  This field is required
                </span>
              )}
              <input
                type="file"
                className="hidden"
                ref={hiddenInputRef}
                name="profilePicture"
                onChange={handleUploadFile}
                accept="image/*"
              />
              <Avatar preview={preview} />
            </div>
          </div>
          <Button secondary={true} text="Upload image" onClick={uploadImage} />
          {errors.profilePicture && (
            <span className="text-xl mt-[-12px] text-red-600">
              {errors.profilePicture.message}
            </span>
          )}
          <Button text="Update" onClick={() => handleSubmit(onSubmit)} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
