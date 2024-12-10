import axios from 'axios';
import { API_URL } from '../../shared/constants';

type ResponseType = {
  status: number;
  data: string;
};

export const signUp = async (formData: FormData): Promise<ResponseType> => {
  return axios
    .post(`${API_URL}/auth/signUp`, formData, {
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
