import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetMoviesDto } from 'src/movies/dto/getMovies.dto';
import {
  transformYtsFindTorrentsResponse,
  transformYtsGetMovieDetailsResponse,
  transformYtsGetMovieResponse,
} from './transform.utils';

@Injectable()
export class YtsService {
  private ytsClient = axios.create({
    baseURL: process.env.YTS_API_URL,
  });

  async getMovies(params: GetMoviesDto) {
    try {
      if (params.genre === 'All') params.genre = ''
      const response = await this.ytsClient.get('/list_movies.json', {
        params,
      });

      const movies = transformYtsGetMovieResponse(response);
      return movies;
    } catch (error) {
      throw new HttpException('Failed to fetch movies', HttpStatus.BAD_REQUEST);
    }
  }

  async getMovieDetails(imdbId: string) {
    try {
      const response = await this.ytsClient.get('/movie_details.json', {
        params: { imdb_id: imdbId, with_cast: true },
      });

      const details = transformYtsGetMovieDetailsResponse(response);
      return details;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch movie details',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMovie(imdbId: string) {
    const movie = await this.getMovies({
      limit: 1,
      page: 1,
      query_term: imdbId,
    });

    return movie[0];
  }

  async findTorrents(imdbId: string) {
    try {
      const response = await this.ytsClient.get('/list_movies.json', {
        params: { query_term: imdbId },
      });
      const torrents = transformYtsFindTorrentsResponse(response);
      return torrents;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fetch movie torrents from yts',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
