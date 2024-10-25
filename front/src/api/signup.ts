import axios from 'axios';
import { API_URL } from '../../shared/constants';

export const signUp = async (formData: FormData) => {
  axios
    .post(`${API_URL}/signup`, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};
