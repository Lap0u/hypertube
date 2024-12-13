import { globalInstance } from './axios';

type ForgetResponse = {
  status: number;
  data: string;
};

export const forgetPassword = async (
  email: string
): Promise<ForgetResponse> => {
  return globalInstance
    .post(`/auth/forgetPassword`, { email: email })
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });
};

export const resetPassword = async (
  password: string,
  token: string
): Promise<ForgetResponse> => {
  return globalInstance
    .post(`/auth/resetPassword`, { newPassword: password, token: token })
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });
};
