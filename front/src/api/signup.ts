import axios from 'axios';
import { SignUpData } from '../dtos/SignupData';
import { API_URL } from '../../shared/constants';

type ResponseType = {
  status: number;
  data: string;
};

export const signUp = async (formData: SignUpData): Promise<ResponseType> => {
  console.log('signup data', formData);
  return axios
    .post(`${API_URL}/auth/signUp`, formData)
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
