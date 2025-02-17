import { Module } from '@nestjs/common';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
	imports: [
	  MoviesModule,
	],
	controllers: [StreamController],
	providers: [StreamService],
})
export class StreamModule {}
