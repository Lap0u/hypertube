import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useContext, useRef, useState } from 'react';
import { SignUpData } from '../dtos/SignupData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { updateUser } from '../api/user';
import { toastConfig } from '../../shared/toastConfig';
import { useNavigate } from 'react-router-dom';
import { Languages } from '../../shared/enum';
import Select from 'react-select';
import { AppContext } from '../components/AppContextProvider';

const Profile = () => {
  const { user } = useContext(AppContext);
  console.log('user profile', user);
  const nav = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>(
    user
      ? {
          defaultValues: {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            preferredLanguage: user.preferredLanguage,
          },
        }
      : {}
  );
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const options = Object.values(Languages).map((language) => ({
    value: language,
    label: (
      <div className="flex items-center gap-x-2">
        <img
          src={`/flags/${language}.png`}
          alt={`Drapeau de ${language}`}
          className="w-8"
        />
        <span>{language}</span>
      </div>
    ),
  }));

  const [file, setFile] = useState<File | null>(null); // Store the file
  const [preview, setPreview] = useState<string>();

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    console.log('data', data);
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
                defaultValue={
                  user?.profilePictureUrl === ''
                    ? '/user-default-white.png'
                    : user?.profilePictureUrl
                }
                onChange={handleUploadFile}
                accept="image/*"
              />
            </div>
          </div>
          <div className="flex gap-x-8 justify-start items-center w-full">
            <p className="text-mainYellow text-2xl">Preferred Language</p>
            <Controller
              name="preferredLanguage"
              control={control} // make sure to get this from useForm()
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  options={options}
                  className=""
                  value={options.find((option) => option.value === field.value)}
                  onChange={(option) => field.onChange(option.value)}
                />
              )}
            />
          </div>
          <p
            className="text-white hover:text-mainYellow text-2xl hover:cursor-pointer"
            onClick={() => nav('/update-password')}>
            Update password ?
          </p>
          <img
            className="w-24 h-24 rounded-full hover:cursor-pointer"
            src={
              preview === undefined
                ? user?.profilePictureUrl === ''
                  ? '/user-default-white.png'
                  : user?.profilePictureUrl
                : preview
            }
            alt=""
            onClick={uploadImage}
          />
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
