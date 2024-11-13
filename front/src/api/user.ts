import axios from 'axios';
import { API_URL } from '../../shared/constants';

type ResponseType = {
  status: number;
  data: string;
};

export const updateUser = async (formData: FormData): Promise<ResponseType> => {
  console.log(localStorage.getItem('token'));
  return axios
    .patch(`${API_URL}/users/me`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      console.log(response);
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
