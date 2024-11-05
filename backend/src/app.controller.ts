import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAccessAuthGuard } from './auth/guards/jwt-auth.guards';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
