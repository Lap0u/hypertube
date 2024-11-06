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
          posterUrl: movie.medium_cover_image,
          releaseDate: String(movie.year),
          imdbRating: movie.rating,
        };
      });
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

      const movie = response.data.data.movie;
      if (movie.id == 0) {
        return null;
      }
      const details = {
        imdbId: movie.imdb_code,
        title: movie.title,
        posterUrl: movie.large_cover_image,
        releaseDate: String(movie.year),
        summary:
          movie.description_full.length != 0 ? movie.description_full : null,
        cast: movie.cast
          ? movie.cast.map((actor) => {
              return {
                name: actor.name,
                character: actor.character_name,
                pictureUrl: actor.url_small_image,
              };
            })
          : null,
        crew: null,
        imdbRating: movie.rating,
      };
      return details;
    } catch (error) {
      throw new HttpException('Failed to fetch movies', HttpStatus.BAD_REQUEST);
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
      const torrents = response.data.data.movies[0].torrents.map((torrent) => {
        return {
          source: 'YTS',
          hash: torrent.hash,
          quality: torrent.quality,
          seeds: torrent.seeds,
          peers: torrent.peers,
          size: torrent.size,
          type: torrent.type,
        };
      });
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
