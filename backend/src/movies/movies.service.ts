import { Injectable } from '@nestjs/common';
import { ApibayService } from 'src/apibay/apibay.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { MovieDetails } from 'src/types/movies.types';
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

  async getMovies(params: GetMoviesDto, userId?: number) {
    let movies = await this.ytsService.getMovies(params);
    if (!userId) {
      return movies;
    }
    movies = await Promise.all(
      movies.map(async (movie) => {
        const isWatched = await this.isWatched(movie.imdbId, userId);
        return { ...movie, watched: isWatched };
      }),
    );
    return movies;
  }

  async getMovieDetails(
    imdbId: string,
    language?: string,
  ): Promise<MovieDetails> {
    const ytsMovieDetails = await this.ytsService.getMovieDetails(imdbId);

    if (!ytsMovieDetails) {
      return null;
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
    const details = await this.getMovieDetails(imdbId, language);
    if (!details) {
      return null;
    }
    const ytsMovieTorrents = await this.ytsService.findTorrents(details.imdbId);
    const apibayTorrents = await this.apibayService.findTorrents(
      details.imdbId,
    );
    const torrents = [...ytsMovieTorrents, ...apibayTorrents];
    return { ...details, torrents };
  }

  async addMovie(hash: string, title: string, path: string, userId: number) {
    return await this.prisma.movie.create({
      data: {
        hash,
        title,
        path,
      },
    });
  }

  async watchMovie(movieId: number, userId: number) {
    const newWatchedMovie = await this.prisma.watchedMovie.create({
      data: {
        movieId,
        userId,
      },
    });
  }

  async isWatched(hash: string, userId: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { hash },
      select: { id: true },
    });

    if (!movie) {
      return false;
    }

    const watchedMovie = await this.prisma.watchedMovie.findFirst({
      where: {
        userId,
        movieId: movie.id,
      },
    });

    return !!watchedMovie;
  }

  async movieExists(hash: string): Promise<boolean> {
    const movie = await this.prisma.movie.findUnique({
      where: { hash },
    });
    return movie !== null;
  }

  async updateDate(hash: string) {
    return this.prisma.movie.update({
      where: {hash},
      data: {
        lastViewed: new Date()
      }
    })
  }
}
