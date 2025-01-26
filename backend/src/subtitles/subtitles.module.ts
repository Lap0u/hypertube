import { Module } from '@nestjs/common';
import { SubtitlesController } from './subtitles.controller';
import { SubtitlesService } from './subtitles.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[UsersModule],
  controllers:[SubtitlesController],
  providers:[SubtitlesService]
})
export class SubtitlesModule {}
