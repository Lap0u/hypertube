import axios from 'axios';
import { API_URL } from '../../shared/constants';

export const login = async (formData: FormData) => {
  axios
    .post(`${API_URL}/auth/signIn`, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};
