import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { YtsService } from 'src/yts/yts.service';

@Injectable()
export class MoviesService {
  constructor(
    private prisma: PrismaService,
    private ytsService: YtsService,
    private tmdbService: TmdbService,
  ) {}

  async getMovies(page: number = 1, limit: number = 20) {
    const movies = await this.ytsService.getMovies(page, limit);
    const result = [];
    for (const movie of movies) {
      const movieDetails = await this.tmdbService.findMovie(movie.imdbId);
      result.push({ ...movie, ...movieDetails });
    }
    return result;
  }

  async getDetails(tmdb_id: number) {}
}
