import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private movieService: MoviesService,
    private tmdbService: TmdbService,
  ) {}

  @Get()
  // getMovies(): Promise<Movie[]> {
  getMovies() {
    return this.movieService.getMovies();
  }

  @Get(`/details/:id`)
  getDetails(
    @Param('id') id: string,
    @Query('source') source: 'tmdb' | 'imdb',
  ) {
    if (source != 'tmdb' && source != 'imdb') {
      throw new BadRequestException('Provide a valid source');
    }
    if (!source) {
      return {};
    } else if (source == 'imdb') {
      return this.tmdbService.findMovie(id);
    } else if (source == 'tmdb') {
      return this.tmdbService.getMovieDetails(Number(id));
    }
  }
}
