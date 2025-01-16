import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CronService {
  constructor(private authService: AuthService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeUnwatchedMovies() {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async removePendingResetPasswordTorken() {
    const expiredTokens =
      await this.authService.getExpiredResetPasswordTokens();
    expiredTokens.forEach(async (tokenInfo) => {
      await this.authService.deleteResetPasswordToken(tokenInfo.token);
    });
  }
}
