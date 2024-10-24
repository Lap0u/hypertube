import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signIn')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }
}
