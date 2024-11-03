import axios from 'axios';
import { API_URL } from '../../shared/constants';
import { UserLoginDto } from '../dtos/UserLoginDto';

export const signIn = async (formData: UserLoginDto) => {
  axios
    .post(`${API_URL}/auth/signIn`, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};
