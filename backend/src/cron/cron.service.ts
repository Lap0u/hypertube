import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';
import { rm } from 'fs/promises';
import { AuthService } from 'src/auth/auth.service';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class CronService {
  constructor(
    private authService: AuthService,
    private movieService: MoviesService,
  ) {}

  private async deleteDirectory(directoryPath: string) {
    if (fs.existsSync(directoryPath)) {
      await rm(directoryPath, { recursive: true, force: true });
      console.log(`Deleted directory: ${directoryPath}`);
    }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_10_SECONDS)
  async removeUnwatchedMovies() {
    const unwatchedMovies = await this.movieService.getUnwatchedMovies();
    if (unwatchedMovies.length == 0) return;
    for (const movie of unwatchedMovies) {
      if (movie.path) {
        await this.deleteDirectory(movie.path);
      }
      await this.movieService.deleteMovie(movie.id);
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
