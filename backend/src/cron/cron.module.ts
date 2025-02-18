import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/auth/auth.module';
import { MoviesModule } from 'src/movies/movies.module';
import { CronService } from './cron.service';

@Module({
  imports: [AuthModule, MoviesModule, ScheduleModule.forRoot()],
  providers: [CronService],
})
export class CronModule {}
