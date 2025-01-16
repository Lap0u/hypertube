import { globalInstance } from './axios';

type PasswordResponse = {
  status: number;
  data: string;
};

export const forgetPassword = async (
  email: string
): Promise<PasswordResponse> => {
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
): Promise<PasswordResponse> => {
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

export const updatePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<PasswordResponse> => {
  return globalInstance
    .patch(`/auth/updatePassword`, {
      currentPassword: currentPassword,
      newPassword: newPassword,
    })
    .then((response) => {
      console.log('response', response);
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });
};
