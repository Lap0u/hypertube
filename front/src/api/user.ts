import axios from 'axios';
import { ACCESS_TOKEN, API_URL } from '../../shared/constants';
import Cookies from 'js-cookie';

type ResponseType = {
  status: number;
  data: string;
};

export const updateUser = async (formData: FormData): Promise<ResponseType> => {
  return axios
    .patch(`${API_URL}/users/me`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
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
