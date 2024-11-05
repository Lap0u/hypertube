import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetMoviesDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Limit of movies per page',
    default: 20,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number = 20;

  @ApiPropertyOptional({ description: 'Search term for movie titles' })
  @IsOptional()
  @IsString()
  query_term?: string;

  @ApiPropertyOptional({ description: 'Filter by genre' })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiPropertyOptional({ description: 'Minimum rating for movies' })
  @IsOptional()
  @IsString()
  minimum_rating?: string;

  @ApiPropertyOptional({ description: 'Sort by specific field' })
  @IsOptional()
  @IsString()
  sort_by?: string;

  @ApiPropertyOptional({ description: 'Order by ascending or descending' })
  @IsOptional()
  @IsString()
  order_by?: string;
}
