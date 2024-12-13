import { useForm, SubmitHandler } from 'react-hook-form';
import { useRef, useState } from 'react';
import { SignUpData } from '../dtos/SignupData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { updateUser } from '../api/user';
import { toastConfig } from '../../shared/toastConfig';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const nav = useNavigate();
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
    formData.append('email', data.email);
    formData.append('firstName', data.firstName ?? '');
    formData.append('lastName', data.lastName ?? '');
    formData.append('preferredLanguage', data.preferredLanguage ?? 'string');
    if (file) {
      formData.append('profilePicture', file);
    }
    const response = await updateUser(formData);
    if (response?.status === 200) {
      toast.success('User updated successfully', toastConfig);
    } else {
      toast.error('An error occurred', toastConfig);
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
      <div className="flex flex-col  justify-center items-center border-2 border-secYellow rounded-xl bg-white bg-opacity-20 p-8 backdrop-blur-sm">
        <form
          className="flex flex-col gap-y-8 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-x-16 justify-center items-start">
            <div className="flex flex-col gap-y-8 px-4 py-8 justify-center items-center">
              <input
                type="text"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="username"
                {...register('username', { required: false })}
              />

              <input
                type="text"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="firstName"
                {...register('firstName', { required: false })}
              />
            </div>
            <div className="flex flex-col gap-y-8 px-4 py-8 justify-center items-center">
              <input
                type="email"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="email"
                {...register('email', { required: false })}
              />
              <input
                type="text"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="lastName"
                {...register('lastName', { required: false })}
              />
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
          <p className="text-mainYellow text-2xl">Preferred Language</p>
          <select
            {...register('preferredLanguage', { required: false })}
            className="px-4 py-2 text-mainYellow rounded-sm">
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
          <p
            className="text-white hover:text-mainYellow text-2xl hover:cursor-pointer"
            onClick={() => nav('/update-password')}>
            Update password ?
          </p>
          <Button secondary={false} text="Upload image" onClick={uploadImage} />
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
