import { useForm, SubmitHandler } from 'react-hook-form';
import Button from './Button';
import { signIn } from '../api/login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toastConfig } from '../../shared/toastConfig';
import { useContext } from 'react';
import { AppContext } from './AppContextProvider';
import { getMe } from '../api/user';

type Inputs = {
  login: string;
  password: string;
};

type LoginFormProps = {
  login: string;
};

const LoginForm = ({ login }: LoginFormProps) => {
  const nav = useNavigate();
  const { setUser } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const { login, password } = data;
    const formData = {
      username: login,
      password,
    };
    const response = await signIn(formData);
    if (response?.status === 201) {
      const userResponse = await getMe();
      if (userResponse.status === 200) {
        setUser(userResponse.data);
        toast.success(response.data, toastConfig);
        nav('/library');
      }
    } else {
      toast.error(response.data || 'An error occurred', toastConfig);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-8 px-4 py-8 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={login}
        className="px-4 py-2 text-mainYellow rounded-sm"
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
        className="px-4 py-2 text-mainYellow rounded-sm"
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
