import { protectedInstance } from './axios';

type ResponseType = {
  status: number;
  data: string;
};

export const signUp = async (formData: FormData): Promise<ResponseType> => {
  return protectedInstance
    .post(`/auth/signUp`, formData, {
      withCredentials: true,
    })
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      console.error(error);
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });
};
