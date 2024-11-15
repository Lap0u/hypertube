import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApibayModule } from './apibay/apibay.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { UsersModule } from './users/users.module';
import { YtsModule } from './yts/yts.module';
import { YtsService } from './yts/yts.service';
import { CommentsService } from './comments/comments.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    MoviesModule,
    YtsModule,
    TmdbModule,
    ApibayModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CommentsModule,
  ],
  controllers: [AppController, CommentsController],
  providers: [AppService, YtsService, CommentsService],
})
export class AppModule {}
