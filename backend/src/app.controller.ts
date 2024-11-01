import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAccessAuthGuard } from './auth/guards/jwt-auth.guards';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAccessAuthGuard)
  @Get('movie')
  getMovie(): string {
    return this.appService.getMovie();
  }
}
