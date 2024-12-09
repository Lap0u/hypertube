import { forwardRef, Module } from '@nestjs/common';
import { ApibayModule } from 'src/apibay/apibay.module';
import { CommentsModule } from 'src/comments/comments.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TmdbModule } from 'src/tmdb/tmdb.module';
import { YtsModule } from 'src/yts/yts.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    PrismaModule,
    YtsModule,
    TmdbModule,
    ApibayModule,
    forwardRef(() => CommentsModule),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
