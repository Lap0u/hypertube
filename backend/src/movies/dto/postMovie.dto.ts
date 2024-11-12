import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostMovieDto {
  @ApiProperty()
  @IsString()
  imdbId: string;

  @ApiProperty()
  @IsString()
  title: string;
}
