import { useForm, SubmitHandler } from 'react-hook-form';
import { useRef, useState, useContext } from 'react';
import { SignUpData } from '../dtos/SignupData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { getMe, updateUser } from '../api/user';
import { toastConfig } from '../../shared/toastConfig';
import { useNavigate } from 'react-router-dom';
import { LANG_DICTIONARY } from '../../shared/constants';
import { AppContext } from '../components/AppContextProvider';

const Profile = () => {
  const nav = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      preferredLanguage: user?.preferredLanguage,
    },
  });
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
      const newUser = await getMe();
      if (newUser.status === 200) setUser(newUser.data);
      nav('/library');
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
    <div className="text-xl md:text-3xl w-screen  flex justify-center items-center bg-mainBlack flex-col min-h-screen">
      <div className="flex flex-col  justify-center items-center border-2 border-secYellow rounded-xl bg-white bg-opacity-20 p-2 md:p-8 backdrop-blur-sm">
        <form
          className="flex flex-col gap-y-8 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-x-4 justify-center items-start">
            <div className="flex flex-col gap-y-8 px-4 py-8 justify-center items-center">
              <input
                type="text"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="username"
                {...register('username', {
                  required: true,
                })}
              />

              <input
                type="text"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="firstName"
                {...register('firstName', { required: true })}
              />
            </div>
            <div className="flex flex-col gap-y-8 px-4 py-8 justify-center items-center">
              <input
                type="email"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="email"
                {...register('email', { required: true })}
              />
              <input
                type="text"
                className="px-4 py-2 text-mainYellow rounded-sm"
                placeholder="lastName"
                {...register('lastName', { required: true })}
              />
              <input
                type="file"
                className="hidden"
                ref={hiddenInputRef}
                name="profilePicture"
                onChange={handleUploadFile}
                accept="image/*"
              />
            </div>
          </div>
          <div className="flex justify-center gap-x-32">
            <div className="flex flex-col gap-y-4">
              <p className="text-mainYellow text-2xl">Preferred Language</p>
              <select
                defaultValue={user?.preferredLanguage}
                {...register('preferredLanguage', { required: false })}
                className="px-4 py-2 text-mainYellow rounded-sm">
                {LANG_DICTIONARY.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <Avatar preview={preview} />
          </div>

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
