import axios from 'axios';
import { API_URL } from '../../shared/constants';
import { UserDto } from '../dtos/UserLoginDto';
import { protectedInstance } from './axios';

type MultiUserResponse = {
  status: number;
  data: UserDto[];
};

type UserResponse = {
  status: number;
  data: UserDto;
};

export const updateUser = async (formData: FormData): Promise<UserResponse> => {
  return protectedInstance
    .patch(`/users/me`, formData, {
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

export const getUsers = async (): Promise<MultiUserResponse> => {
  return protectedInstance
    .get(`/users`, {
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

export const getMe = async (): Promise<UserResponse> => {
  return protectedInstance
    .get(`/users/me`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('res me', response);
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      console.log('err', error);
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });
};
