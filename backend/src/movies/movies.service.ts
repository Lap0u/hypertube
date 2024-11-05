import { Injectable } from '@nestjs/common';
import { ApibayService } from 'src/apibay/apibay.service';
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
    private apibayService: ApibayService,
  ) {}

  async getMovies(params: GetMoviesDto) {
    const movies = await this.ytsService.getMovies(params);
    return movies;
  }

  async getMovieDetails(imdbId: string, language?: string) {
    const movie = await this.ytsService.findMovie(imdbId);

    if (!movie) {
      return {};
    }

    const tmdbInfo = await this.tmdbService.findMovie(imdbId);
    const details = await this.tmdbService.getMovieDetails(
      tmdbInfo.tmdbId,
      language,
    );
    return { imdbRating: movie.rating, ...details };
  }

  async getMovie(imdbId: string, language?: string) {
    const ytsMovieTorrents = await this.ytsService.findTorrents(imdbId);
    const apibayTorrents = await this.apibayService.findTorrents(imdbId);
    const details = await this.getMovieDetails(imdbId, language);
    const torrents = [...ytsMovieTorrents, ...apibayTorrents];
    return { ...details, torrents };
  }
}
