import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional()
  preferredLanguage: string;

  @ApiPropertyOptional({
    type: 'file',
    name: 'profilePicture',
    format: 'binary',
  })
  @IsOptional()
  profilePicture: Express.Multer.File;
}
