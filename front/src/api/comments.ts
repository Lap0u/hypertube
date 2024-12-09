import axios from 'axios';
import { API_URL } from '../../shared/constants';

export const getComments = (imdbId: string) => {
  return axios
    .get(`${API_URL}/movies/${imdbId}/comments`, {
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

export const postComments = (imdbId: string, content: string) => {
  return axios
    .post(`${API_URL}/comments?movieId=${imdbId}&content=${content}`, {
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
