import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
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
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.signUp(createUserDto);
    return 'User successfully created !';
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
