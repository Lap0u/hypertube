import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TmdbService {
  private tmdbClient = axios.create({
    baseURL: process.env.TMDB_API_URL,
    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
  });

  async getMovieDetails(tmdb_id: number) {
    const response = await this.tmdbClient.get(`/movie/${tmdb_id}`);
    return response.data;
  }

  async findMovie(imdb_id: string) {
    const response = await this.tmdbClient.get(
      `/find/${imdb_id}?external_source=imdb_id`,
    );
    const result = response.data.movie_results[0];
    const movie = {
      tmdb_id: result.id,
      title: result.title,
      poster_url: `${process.env.TMDB_IMAGE_URL}${result.poster_path}`,
      release_date: result.release_date,
    };
    return movie;
  }
}
