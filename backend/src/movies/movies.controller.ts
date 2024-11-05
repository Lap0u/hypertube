import { Controller, Get, Param, Query } from '@nestjs/common';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { GetMoviesDto } from './dto/getMovies.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private movieService: MoviesService,
    private tmdbService: TmdbService,
  ) {}

  @Get()
  getMovies(@Query() params: GetMoviesDto) {
    return this.movieService.getMovies(params);
  }

  @Get(`/:imdb_id`)
  getDetails(@Param('imdb_id') imdb_id: string) {
    return this.movieService.getMovie(imdb_id);
  }
}
