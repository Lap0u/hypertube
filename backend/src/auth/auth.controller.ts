import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-auth.guards';
import { jwtConstants } from './jwt.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
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
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile()
    profilePicture: Express.Multer.File,
  ) {
    if (profilePicture) {
      // Apply the validation manually since we need custom logic
      const isValidFile = new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }).transform(profilePicture);

      if (!isValidFile) throw new BadRequestException('Invalid file format.');
    }

    const profilePictureUrl = profilePicture
      ? `/uploads/${profilePicture.filename}`
      : '';
    delete createUserDto.profilePicture;

    await this.authService.signUp(createUserDto, profilePictureUrl);
    return 'User successfully created!';
  }

  @Post('signIn')
  async signIn(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.signIn(loginDto);

    response.cookie(
      jwtConstants().accessTokenCookieName,
      accessToken,
      jwtConstants().accessTokenCookieConfig,
    );
    response.cookie(
      jwtConstants().refreshTokenCookieName,
      refreshToken,
      jwtConstants().refreshTokenCookieConfig,
    );
    return 'User successfully signed in !';
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      req.user,
    );
    response.cookie(
      jwtConstants().accessTokenCookieName,
      accessToken,
      jwtConstants().accessTokenCookieConfig,
    );
    response.cookie(
      jwtConstants().refreshTokenCookieName,
      refreshToken,
      jwtConstants().refreshTokenCookieConfig,
    );
    return 'Tokens successfully refreshed !';
  }
}
