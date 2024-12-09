import { Module } from '@nestjs/common';
import { MoviesModule } from 'src/movies/movies.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [PrismaModule, MoviesModule],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
