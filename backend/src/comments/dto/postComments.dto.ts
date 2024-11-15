import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostCommentsDto {
  @ApiProperty()
  @IsString()
  movieId: string;

  @ApiProperty()
  @IsString()
  content: string;
}
