import { FullMovieDto, MovieDto } from '../dtos/MovieDto';
import {
  GenreField,
  MinRatingField,
  OrderByField,
  SortMovieField,
} from '../../shared/enum';
import { UserDto } from '../dtos/UserLoginDto';
import { globalInstance, protectedInstance } from './axios';

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
  console.log('getMovies', user);
  if (user) {
    return protectedInstance
      .get(`/movies`, { params })
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
  }
  return globalInstance
    .get(`/movies/popular`, { params })
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

export const getMovie = async (
  imdbId: string,
  preferredLanguage: string | undefined
): Promise<MovieResponseType> => {
  return globalInstance
    .get(`/movies/${imdbId}?language=${preferredLanguage}`)
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
const testRespone = [
  {
    kind: 'subtitles',
    src: 'https://www.opensubtitles.com/download/B156EF5993C5A8CDF574D8097E02E36CE5C5E252DDD6B7E1F1D08ED58E68B63B21E65E2D236354DF0970C47B53E7A4F1B47A931098E3F15E97A3919479C5A499F1C0E4CDFC5D9CC665CF632187EBAEF7D38D25421B3C592A23D7BFE776885AAC27A3F267093935B4A5567246ECBA4F58E2F3A5361F30FBF7690121127B9586392A49D8064485ECAFF9FE6F9687A6D59B89E1C68488AC937AC99E5E35B4ACA32E36A2C3F5C1B0BF5A574411819DC16F51DC530A1EC1EDE512174BCB681E32773620E949CFB86DF009E585991523AFA1CF985A5C98422896DA6590F46BF8ABB990D2BED093347CC1C4C7EAF1B9D9BA2A53CCDF8845897C1807DBCEA7222E34CAA631A6E732DB6010425F7A4E0F7364EA912A04A6A0E81E6BA61E7461E6736FE37A3380AE9823609C2F4B855F6880AE3F8481665DBD8DE357C068AE5EC56B761963/subfile/The%20Shawshank%20Redemption.Eng_BluRay_Full_Fixed_v2.webvtt',
    srcLang: 'en',
    label: 'English',
    default: false,
  },
];

export const downloadSubtitles = async (
  imdb_id: string | undefined,
  userId: number | undefined
) => {
  if (!imdb_id) {
    return {
      status: 400,
      data: 'Invalid torrent hash',
    };
  }
  return protectedInstance
    .get(`/subtitles?imdb_id=${imdb_id}&userId=${userId}`, {
      withCredentials: true,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });
};
