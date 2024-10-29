import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class YtsService {
  private ytsClient = axios.create({
    baseURL: process.env.YTS_API_URL,
  });

  async getMovies(page: number = 1, limit: number = 20) {
    try {
      const response = await this.ytsClient.get('/list_movies.json', {
        params: { page, limit },
      });

      const movies = response.data.data.movies.map((movie) => {
        return {
          imdb_id: movie.imdb_code,
          imdb_rating: movie.rating,
          torrents: movie.torrents.map((torrent) => {
            return { hash: torrent.hash };
          }),
        };
      });
      return movies;
    } catch (error) {
      throw new HttpException('Failed to fetch movies', HttpStatus.BAD_REQUEST);
    }
  }
}
