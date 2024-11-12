import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CommentsService } from 'src/comments/comments.service';
import {
  fileMimeTypeFilter,
  fileValidation,
} from 'src/utils/file-upload.utils';
import { GetUserDto, GetUsersDto } from './dto/getUsers.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private commentsService: CommentsService,
  ) {}

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  getUsers(@Query() getUsersDto: GetUsersDto) {
    const { limit, page } = getUsersDto;
    return this.usersService.findAll(limit, page);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getUser(@Param() getUserDto: GetUserDto) {
    return this.usersService.findOne(getUserDto.id);
  }

  @Get(':id/comments')
  @UsePipes(new ValidationPipe({ transform: true }))
  getUserComments(@Param() getUserDto: GetUserDto) {
    return this.commentsService.getUserComments(getUserDto.id);
  }

  @Patch('me')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      fileFilter: fileMimeTypeFilter,
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
    fileValidation(profilePicture);
    const user = req.user;
    delete dto.profilePicture;
    const profilePictureUrl = profilePicture
      ? `/uploads/${profilePicture.filename}`
      : null;
    await this.usersService.updateUser(user.id, dto, profilePictureUrl);
    return 'User successfully updated !';
  }
}
