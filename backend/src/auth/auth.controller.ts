import {
  Body,
  Controller,
  Get,
  Patch,
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
import { LoginDto } from 'src/auth/dto/login.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import {
  fileMimeTypeFilter,
  fileValidation,
} from 'src/utils/file-upload.utils';
import { AuthService } from './auth.service';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { FortyTwoOAuthGuard } from './guards/fortytwo-oauth.guards';
import { GoogleOAuthGuard } from './guards/google-oauth.guards';
import {
  JwtAccessAuthGuard,
  JwtRefreshAuthGuard,
} from './guards/jwt-auth.guards';
import { jwtConstants } from './jwt.constant';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signUp')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      fileFilter: fileMimeTypeFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile()
    profilePicture: Express.Multer.File,
  ) {
    fileValidation(profilePicture);

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

  @Patch('updatePassword')
  @UseGuards(JwtAccessAuthGuard)
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Req() req,
  ) {
    const user = req.user;
    await this.authService.updatePassword(
      user.id,
      updatePasswordDto.currentPassword,
      updatePasswordDto.newPassword,
    );

    return 'Password successfully changed !';
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = req.user;
    const { accessToken, refreshToken } =
      await this.authService.googleSignIn(user);

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

    return response.redirect(process.env.GOOGLE_REDIRECT_URL_CLIENT);
  }

  @Get('42')
  @UseGuards(FortyTwoOAuthGuard)
  async fortyTwoAuth() {}

  @Get('42/callback')
  @UseGuards(FortyTwoOAuthGuard)
  async fortyTwoCallback(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = req.user;
    const { accessToken, refreshToken } =
      await this.authService.fortyTwoSignIn(user);

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

    return response.redirect(process.env.GOOGLE_REDIRECT_URL_CLIENT);
  }
}
