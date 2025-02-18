import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthService } from 'src/auth/auth.service';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class CronService {
  constructor(private authService: AuthService,
    private movieService: MoviesService) {}

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_10_SECONDS)
  async removeUnwatchedMovies() {
    const unwatchedMovieIds = await this.movieService.getUnwatchedMovies()
    if (unwatchedMovieIds.length == 0) return
    for (const movie of unwatchedMovieIds) {
      await this.movieService.deleteMovie(movie.id)
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async removePendingResetPasswordTorken() {
    const expiredTokens =
      await this.authService.getExpiredResetPasswordTokens();
    expiredTokens.forEach(async (tokenInfo) => {
      await this.authService.deleteResetPasswordToken(tokenInfo.token);
    });
  }
}
