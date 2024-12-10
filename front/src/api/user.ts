import axios from 'axios';
import { API_URL } from '../../shared/constants';
import { UserDto } from '../dtos/UserLoginDto';

type ResponseType = {
  status: number;
  data: UserDto[];
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

export const getUsers = async (): Promise<ResponseType> => {
  return axios
    .get(`${API_URL}/users`, {
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
