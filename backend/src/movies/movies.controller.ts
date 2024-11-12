import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CommentsService } from 'src/comments/comments.service';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { GetMoviesDto } from './dto/getMovies.dto';
import { PostMovieDto } from './dto/postMovie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private movieService: MoviesService,
    private commentsService: CommentsService,
    private tmdbService: TmdbService,
  ) {}

  @Get()
  getMovies(@Query() params: GetMoviesDto) {
    return this.movieService.getMovies(params);
  }

  @Get(`/:imdbId`)
  @ApiQuery({ name: 'language', required: false })
  getDetails(
    @Param('imdbId') imdbId: string,
    @Query('language') language?: string,
  ) {
    return this.movieService.getMovie(imdbId, language);
  }

  @Get(`/:imdbId/comments`)
  getMovieComments(@Param('imdbId') imdbId: string) {
    return this.commentsService.getMovieComments(imdbId);
  }

  @Post()
  addMovie(@Query() movieDetails: PostMovieDto) {
    const { imdbId, title } = movieDetails;
    this.movieService.addMovie(imdbId, title);
  }
}
