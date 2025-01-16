import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/auth/auth.module';
import { CronService } from './cron.service';

@Module({
  imports: [AuthModule, ScheduleModule.forRoot()],
  providers: [CronService],
})
export class CronModule {}
