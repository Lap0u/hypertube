import axios from 'axios';
import { SignUpData } from '../dtos/SignupData';
import { API_URL } from '../../shared/constants';

export const signUp = async (formData: SignUpData) => {
  console.log('signup data', formData);
  axios
    .post(`${API_URL}/auth/signUp`, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};
