import axios from 'axios';
import { API_URL } from '../../shared/constants';
import { UserLoginDto } from '../dtos/UserLoginDto';

type ResponseType = {
  status: number;
  data: string;
};

export const signIn = async (formData: UserLoginDto): Promise<ResponseType> => {
  return axios
    .post(`${API_URL}/auth/signIn`, formData, {
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
