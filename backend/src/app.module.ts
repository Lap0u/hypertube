import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { YtsService } from './yts/yts.service';
import { YtsModule } from './yts/yts.module';
import { TmdbModule } from './tmdb/tmdb.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, MoviesModule, YtsModule, TmdbModule],
  controllers: [AppController],
  providers: [AppService, YtsService],
})
export class AppModule {}
