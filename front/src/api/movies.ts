import axios from 'axios';
import { API_URL } from '../../shared/constants';
import { FullMovieDto, MovieDto } from '../dtos/MovieDto';
import {
  GenreField,
  MinRatingField,
  OrderByField,
  SortMovieField,
} from '../../shared/enum';

type MoviesResponseType = {
  status: number;
  data: MovieDto[];
  message: string;
};

type MovieResponseType = {
  status: number;
  data: FullMovieDto | null;
  message: string;
};

export type movieQueryParams = {
  page: number;
  limit?: number;
  query_term?: string;
  genre?: GenreField;
  minimum_rating?: MinRatingField;
  sort_by?: SortMovieField;
  order_by: OrderByField;
};

export const getMovies = async (
  params: movieQueryParams
): Promise<MoviesResponseType> => {
  // return {
  //   status: 200,
  //   data: moviesMockData,
  //   message: '',
  // };
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

export const getMovie = async (imdbId: string): Promise<MovieResponseType> => {
  return axios
    .get(`${API_URL}/movies/${imdbId}`)
    .then((response) => {
      return { status: response.status, data: response.data, message: '' };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: null,
        message: error.response.data.message,
      };
    });
};
