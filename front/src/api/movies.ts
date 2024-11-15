import axios from 'axios';
import { API_URL } from '../../shared/constants';
import { MovieDto } from '../dtos/MovieDto';

type ResponseType = {
  status: number;
  data: MovieDto[];
  message: string;
};

export type movieQueryParams = {
  page: number;
  limit?: number;
  query_term?: string;
  genre?: string;
  minimum_rating?: number;
  sort_by?: string;
  order_by: 'asc' | 'desc';
};

export const getMovies = async (
  params: movieQueryParams
): Promise<ResponseType> => {
  return axios
    .get(`${API_URL}/movies`, { params })
    .then((response) => {
      return { status: response.status, data: response.data, message: '' };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: [],
        message: error.response.data.message,
      };
    });
};
