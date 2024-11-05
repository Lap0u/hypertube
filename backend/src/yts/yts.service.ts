import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetMoviesDto } from 'src/movies/dto/getMovies.dto';

@Injectable()
export class YtsService {
  private ytsClient = axios.create({
    baseURL: process.env.YTS_API_URL,
  });

  async getMovies(params: GetMoviesDto) {
    try {
      const response = await this.ytsClient.get('/list_movies.json', {
        params,
      });

      const movies = response.data.data.movies.map((movie) => {
        return {
          imdbId: movie.imdb_code,
          title: movie.title,
          thumbnail: movie.medium_cover_image,
          year: movie.year,
          imdbRating: movie.rating,
        };
      });
      return movies;
    } catch (error) {
      throw new HttpException('Failed to fetch movies', HttpStatus.BAD_REQUEST);
    }
  }

  async getMovieHashes(imdbId: string) {
    try {
      const response = await this.ytsClient.get('/list_movies.json', {
        params: { query_term: imdbId },
      });
      const hashes = response.data.data.movies[0].torrents.map((torrent) => {
        return {
          hash: torrent.hash,
          quality: torrent.quality,
          seeds: torrent.seeds,
          peers: torrent.peers,
          size: torrent.size,
          type: torrent.type,
        };
      });
      return hashes;
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to fetch movies', HttpStatus.BAD_REQUEST);
    }
  }
}
