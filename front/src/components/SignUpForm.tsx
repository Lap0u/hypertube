import { useForm, SubmitHandler } from 'react-hook-form';
import Button from './Button';
import { useRef, useState } from 'react';
import Avatar from './Avatar';
import { SignUpData } from '../dtos/SignupData';
import { signUp } from '../api/signup';

const SignUpForm = () => {
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
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (file) {
      formData.append('profilePicture', file);
    }

    // Send the form data to your API endpoint
    signUp(formData);
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
    <form
      className="flex flex-col gap-y-8 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-x-16 justify-center items-start">
        <div className="flex flex-col gap-y-8 px-4 py-8 justify-center items-center">
          <input
            type="text"
            className="px-4 py-2 text-mainYellow rounded-sm"
            placeholder="username"
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
            {...register('firstName', { required: true })}
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
            {...register('lastName', { required: true })}
          />
          {errors.lastName && (
            <span className="text-xl mt-[-12px] text-red-600">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col gap-y-8 px-4 py-8 justify-center items-center">
          <input
            type="email"
            className="px-4 py-2 text-mainYellow rounded-sm"
            placeholder="email"
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
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
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
            required
            onChange={handleUploadFile}
            accept="image/*"
          />
          <Avatar preview={preview} />
        </div>
      </div>
      <Button secondary={true} text="Upload image" onClick={uploadImage} />
      {errors.profilePicture && (
        <span className="text-xl mt-[-12px] text-red-600">
          This field is required
        </span>
      )}
      <Button text="Sign-up" onClick={() => handleSubmit(onSubmit)} />
    </form>
  );
};

export default SignUpForm;