import { CommentsDto } from '../dtos/CommentsDto';
import { protectedInstance } from './axios';

type CommentsResponse = {
  status: number;
  data: CommentsDto[];
};

export const getComments = async (
  imdbId: string
): Promise<CommentsResponse> => {
  return protectedInstance
    .get(`/movies/${imdbId}/comments`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log('comm', response.data);
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

export const postComments = async (imdbId: string, content: string) => {
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
