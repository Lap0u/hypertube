import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  transformTmdbFindMovieResponse,
  transformTmdbGetMovieResponse,
} from './transform.utils';

@Injectable()
export class TmdbService {
  private tmdbClient = axios.create({
    baseURL: process.env.TMDB_API_URL,
    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
  });

  async getMovieDetails(tmdb_id: number, language?: string) {
    try {
      const response = await this.tmdbClient.get(
        `/movie/${tmdb_id}?append_to_response=credits${language ? '&language=' + language : ''}`,
      );

      const details = transformTmdbGetMovieResponse(response);
      return details;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch movie details from tmdb',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMovie(imdb_id: string) {
    try {
      const response = await this.tmdbClient.get(
        `/find/${imdb_id}?external_source=imdb_id`,
      );

      const movie = transformTmdbFindMovieResponse(response);
      return movie;
    } catch (error) {
      throw new HttpException(
        'Failed to find movie from tmdb',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getMovieDetailsFromImdb(imdbId: string, language?: string) {
    const tmdbInfo = await this.findMovie(imdbId);
    if (!tmdbInfo) {
      return null;
    }
    const tmdbDetails = await this.getMovieDetails(tmdbInfo.tmdbId, language);
    return tmdbDetails;
  }
}
