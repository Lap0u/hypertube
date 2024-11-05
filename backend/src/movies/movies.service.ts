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

  async getDetails(imdbId: string) {
    return await this.ytsService.getMovieHashes(imdbId);
  }
}
