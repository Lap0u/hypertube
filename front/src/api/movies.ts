import axios from 'axios';
import { API_URL } from '../../shared/constants';
import { MovieDto } from '../dtos/MovieDto';

const moviesMockData: MovieDto[] = [
  {
    imdbId: 'tt31863474',
    title: 'The Sky Above Zenica',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2024',
    imdbRating: 8,
  },
  {
    imdbId: 'tt28290687',
    title: 'The Story of Playstation',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2023',
    imdbRating: 3.3,
  },
  {
    imdbId: 'tt27044408',
    title: 'Andy Huggins: Early Bird Special',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2023',
    imdbRating: 7.8,
  },
  {
    imdbId: 'tt17059618',
    title: 'The Shade',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2023',
    imdbRating: 4.9,
  },
  {
    imdbId: 'tt30287778',
    title: 'I, the Executioner',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2024',
    imdbRating: 6.6,
  },
  {
    imdbId: 'tt28090270',
    title: 'Feather Christmas',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2024',
    imdbRating: 3.7,
  },
  {
    imdbId: 'tt34530166',
    title: 'Jim Gaffigan: The Skinny',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2024',
    imdbRating: 7,
  },
  {
    imdbId: 'tt27251486',
    title: 'Miki',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2024',
    imdbRating: 7.4,
  },
  {
    imdbId: 'tt0142453',
    title: "Kipling's Women",
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '1961',
    imdbRating: 5.1,
  },
  {
    imdbId: 'tt31228225',
    title: 'Summer Rain',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2024',
    imdbRating: 0,
  },
  {
    imdbId: 'tt2118689',
    title: 'The Pomegranate',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2011',
    imdbRating: 6.6,
  },
  {
    imdbId: 'tt5119310',
    title: 'Kuyucakli Yusuf',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '1985',
    imdbRating: 5.8,
  },
  {
    imdbId: 'tt0263975',
    title: 'The Girl with the Red Scarf',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '1977',
    imdbRating: 8.5,
  },
  {
    imdbId: 'tt0485510',
    title: 'Killing the Shadows',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2006',
    imdbRating: 7.5,
  },
  {
    imdbId: 'tt0280356',
    title: 'Night Journey',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '1988',
    imdbRating: 7.1,
  },
  {
    imdbId: 'tt0252405',
    title: 'Queer World',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '1988',
    imdbRating: 7.3,
  },
  {
    imdbId: 'tt0275089',
    title: 'Revenge of the Snakes',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '1961',
    imdbRating: 7.7,
  },
  {
    imdbId: 'tt0252591',
    title: 'King of the Doormen',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '1976',
    imdbRating: 8.4,
  },
  {
    imdbId: 'tt1386014',
    title: 'Yasam Arsizi',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2008',
    imdbRating: 7.6,
  },
  {
    imdbId: 'tt5280652',
    title: 'Rauf',
    posterUrl: 'https://en.yts-official.mx/movies/poster/get-fast-2024.jpg',
    releaseDate: '2016',
    imdbRating: 6.7,
  },
];

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
  return {
    status: 200,
    data: moviesMockData,
    message: '',
  };
  // return axios
  //   .get(`${API_URL}/movies`, { params })
  //   .then((response) => {
  //     return { status: response.status, data: response.data, message: '' };
  //   })
  //   .catch((error) => {
  //     return {
  //       status: error.response.status,
  //       data: [],
  //       message: error.response.data.message,
  //     };
  //   });
};
