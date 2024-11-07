import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch('')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      fileFilter: (req, file, callback) => {
        // Only allow specified file types
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Invalid file type'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAccessAuthGuard)
  async patchUser(
    @Body() dto: UpdateUserDto,
    @UploadedFile()
    profilePicture: Express.Multer.File,
    @Req() req,
  ) {
    if (profilePicture) {
      // Apply the validation manually since we need custom logic
      const isValidFile = new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }).transform(profilePicture);

      if (!isValidFile) throw new BadRequestException('Invalid file format.');
    }
    const user = req.user;
    delete dto.profilePicture;
    const profilePictureUrl = profilePicture
      ? `/uploads/${profilePicture.filename}`
      : null;
    await this.usersService.updateUser(user.id, dto, profilePictureUrl);
    return 'User successfully updated !';
  }
}
