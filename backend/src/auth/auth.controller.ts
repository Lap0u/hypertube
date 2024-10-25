import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signIn')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) response: Response) {
    return await this.authService.refreshTokens(req.user);
  }
}
