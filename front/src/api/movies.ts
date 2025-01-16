import { FullMovieDto, MovieDto } from "../dtos/MovieDto";
import {
  GenreField,
  MinRatingField,
  OrderByField,
  SortMovieField,
} from "../../shared/enum";
import { UserDto } from "../dtos/UserLoginDto";
import { globalInstance, protectedInstance } from "./axios";
import { getMe } from "./user";

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
  params: movieQueryParams,
  user: UserDto | undefined
): Promise<MoviesResponseType> => {
  if (user) {
    return protectedInstance
      .get(`/movies`, { params })
      .then((response) => {
        return { status: response.status, data: response.data, message: "" };
      })
      .catch((error) => {
        return {
          status: error.response.status,
          data: [],
          message: error.response.data.message,
        };
      });
  }
  return globalInstance
    .get(`/movies/popular`, { params })
    .then((response) => {
      return { status: response.status, data: response.data, message: "" };
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
  return globalInstance
    .get(`/movies/${imdbId}`)
    .then((response) => {
      return { status: response.status, data: response.data, message: "" };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        data: null,
        message: error.response.data.message,
      };
    });
};

export const downloadSubtitles = async (
  torrentHash: string | undefined,
  // pageId: string
) => {
  if (!torrentHash) {
    return {
      status: 400,
      data: "Invalid torrent hash",
    };
  }
  return protectedInstance
    // .get(`/stream/subtitles?hash=${torrentHash}&pageId=${pageId}`, {
    .get(`/stream/subtitles?hash=${torrentHash}`, {
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
