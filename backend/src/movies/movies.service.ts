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
    const ytsMovieDetails = await this.ytsService.getMovieDetails(imdbId);

    if (!ytsMovieDetails) {
      return {};
    }

    const tmdbMovieDetails = await this.tmdbService.getMovieDetailsFromImdb(
      imdbId,
      language,
    );

    if (!tmdbMovieDetails) {
      return ytsMovieDetails;
    }

    for (const details in ytsMovieDetails) {
      if (!tmdbMovieDetails[details]) {
        tmdbMovieDetails[details] = ytsMovieDetails[details];
      }
    }
    return tmdbMovieDetails;
  }

  async getMovie(imdbId: string, language?: string) {
    const ytsMovieTorrents = await this.ytsService.findTorrents(imdbId);
    const apibayTorrents = await this.apibayService.findTorrents(imdbId);
    const details = await this.getMovieDetails(imdbId, language);
    const torrents = [...ytsMovieTorrents, ...apibayTorrents];
    return { ...details, torrents };
  }
}
