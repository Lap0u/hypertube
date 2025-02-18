import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApibayModule } from './apibay/apibay.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { CronModule } from './cron/cron.module';
import { MailModule } from './mail/mail.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { StreamController } from './stream/stream.controller';
import { StreamModule } from './stream/stream.module';
import { StreamService } from './stream/stream.service';
import { SubtitlesModule } from './subtitles/subtitles.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { UsersModule } from './users/users.module';
import { YtsModule } from './yts/yts.module';
import { YtsService } from './yts/yts.service';

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
    StreamModule,
    MailModule,
    SubtitlesModule,
    CronModule,
  ],
  controllers: [AppController, CommentsController, StreamController],
  providers: [AppService, YtsService, CommentsService, StreamService],
})
export class AppModule {}
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*');
//   }
// }
