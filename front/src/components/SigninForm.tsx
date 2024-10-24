import { useForm, SubmitHandler } from 'react-hook-form';
import Button from './Button';

type Inputs = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
};

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      className="flex flex-col gap-y-8 px-4 py-8 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="px-4 py-2 text-black rounded-sm"
        placeholder="username"
        {...register('username')}
      />
      {errors.username && (
        <span className="text-xl mt-[-12px] text-red-600">
          This field is required
        </span>
      )}
      <input
        type="text"
        className="px-4 py-2 text-black rounded-sm"
        placeholder="firstName"
        {...register('firstName')}
      />
      {errors.firstName && (
        <span className="text-xl mt-[-12px] text-red-600">
          This field is required
        </span>
      )}
      <input
        type="text"
        className="px-4 py-2 text-black rounded-sm"
        placeholder="lastName"
        {...register('lastName')}
      />
      {errors.lastName && (
        <span className="text-xl mt-[-12px] text-red-600">
          This field is required
        </span>
      )}
      <input
        type="email"
        className="px-4 py-2 text-black rounded-sm"
        placeholder="email"
        {...register('email')}
      />
      {errors.email && (
        <span className="text-xl mt-[-12px] text-red-600">
          This field is required
        </span>
      )}

      <input
        type="password"
        className="px-4 py-2 text-black rounded-sm"
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
        className="px-4 py-2 text-black rounded-sm"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
        {...register('profilePicture', { required: true })}
      />
      {errors.profilePicture && (
        <span className="text-xl mt-[-12px] text-red-600">
          This field is required
        </span>
      )}

      <Button text="Sign-in" onClick={() => handleSubmit(onSubmit)} />
    </form>
  );
};

export default SigninForm;
