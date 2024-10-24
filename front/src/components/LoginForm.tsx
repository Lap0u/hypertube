import { useForm, SubmitHandler } from 'react-hook-form';
import Button from './Button';

type Inputs = {
  login: string;
  password: string;
};

const LoginForm = () => {
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
        className="px-4 py-2 text-black rounded-sm"
        placeholder="john"
        {...register('login')}
      />
      {errors.password && (
        <span className="text-xl text-red-600 mt-[-12px]">
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
        <span className="text-xl text-red-600 mt-[-12px]">
          This field is required
        </span>
      )}

      <Button text="Log-in" onClick={() => handleSubmit(onSubmit)} />
    </form>
  );
};

export default LoginForm;
