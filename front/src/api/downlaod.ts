import axios from 'axios';
import { API_URL } from '../../shared/constants';

export const downloadMovie = (torrentHash: string) => {
  return axios
    .post(`${API_URL}/metTonAddresseIciThomas?hash=${torrentHash}`, {
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
