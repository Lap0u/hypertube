import { protectedInstance } from './axios';

export const getComments = (imdbId: string) => {
  return protectedInstance
    .get(`/movies/${imdbId}/comments`, {
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
  return protectedInstance
    .post(
      `/comments?movieId=${imdbId}&content=${content}`,
      {},
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
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
