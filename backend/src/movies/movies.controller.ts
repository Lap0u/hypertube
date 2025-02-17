import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CommentsService } from 'src/comments/comments.service';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { SortMovieField } from './dto/enums';
import { GetMoviesDto, GetPopularMoviesDto } from './dto/getMovies.dto';
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
  @UseGuards(JwtAccessAuthGuard)
  async getMovies(@Query() params: GetMoviesDto, @Req() req) {
    const user = req.user;
    const movie = await this.movieService.getMovies(params, user.id);
    if (!movie) {
      return {};
    }
    return movie;
  }

  @Get('popular')
  async getPopularMovies(@Query() params: GetPopularMoviesDto) {
    const movie = await this.movieService.getMovies({
      ...params,
      sort_by: SortMovieField.DOWNLOAD_COUNT,
    });
    if (!movie) {
      return {};
    }
    return movie;
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

  // @Post()
  // addMovie(@Query() movieDetails: PostMovieDto) {
  //   const { imdbId, title } = movieDetails;
  //   this.movieService.addMovie(imdbId, title);
  // }

  @Post('/:id/watch')
  @UseGuards(JwtAccessAuthGuard)
  async watchMovie(@Param('id') movieId: number, @Req() req) {
    const user = req.user;
    const watchedMovie = await this.movieService.watchMovie(
      Number(movieId),
      user.id,
    );
    console.log(watchedMovie);
  }
}
