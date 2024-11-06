import {
  Controller,
  Patch,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch('')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('profilePicture'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profilePicture: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtAccessAuthGuard)
  async pathUser(
    @Query() dto: UpdateUserDto,
    @UploadedFile() profilePicture: Express.Multer.File,
    @Req() req,
  ) {
    const user = req.user;
    const profilePictureUrl = profilePicture
      ? `/uploads/${profilePicture.filename}`
      : null;
    await this.usersService.updateUser(user.id, dto, profilePictureUrl);
    return 'User successfully updated !';
  }
}
