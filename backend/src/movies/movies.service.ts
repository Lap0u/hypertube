import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { YtsService } from 'src/yts/yts.service';
import { GetMoviesDto } from './dto/getMovies.dto';

@Injectable()
export class MoviesService {
  constructor(
    private prisma: PrismaService,
    private ytsService: YtsService,
    private tmdbService: TmdbService,
  ) {}

  async getMovies(params: GetMoviesDto) {
    const movies = await this.ytsService.getMovies(params);
    return movies;
  }

  async getMovieDetails(imdbId: string) {
    const movie = await this.ytsService.findMovie(imdbId);

    if (!movie) {
      return {};
    }

    const tmdbInfo = await this.tmdbService.findMovie(imdbId);
    const details = await this.tmdbService.getMovieDetails(tmdbInfo.tmdbId);
    return { imdbRating: movie.rating, ...details };
  }

  async getMovie(imdbId: string) {
    const ytsMovieTorrents = await this.ytsService.getMovieTorrents(imdbId);
    const details = await this.getMovieDetails(imdbId);
    const torrents = ytsMovieTorrents;
    return { ...details, torrents };
  }
}
