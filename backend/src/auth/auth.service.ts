import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './jwt.constant';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { username, password } = loginDto;
    let user = null;
    if (username) {
      user = await this.usersService.findUserByUsername(username);
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async signIn(loginDto: LoginDto) {
    let user = await this.validateUser(loginDto);

    const payload = { sub: user.id, username: user.username };

    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);
    this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async signUp(payload: CreateUserDto) {
    const hashPass: string = await bcrypt.hash(
      payload.password,
      this.saltOrRounds,
    );

    let data = {
      ...payload,
      password: hashPass,
    };

    const user = await this.usersService.createUser(data);
    return user;
  }

  async createAccessToken(payload: { sub: number; username: string }) {
    const date = Date.now();
    return this.jwtService.sign(
      { ...payload, date: date },
      {
        secret: jwtConstants().accessTokenSecret,
        expiresIn: '15m',
      },
    );
  }

  async createRefreshToken(payload: { sub: number; username: string }) {
    const date = Date.now();
    return this.jwtService.sign(
      { ...payload, date: date },
      {
        secret: jwtConstants().refreshTokenSecret,
        expiresIn: '7d',
      },
    );
  }

  async verifyRefreshToken(userId: number, refreshToken: string) {
    const user = this.prisma.user.findFirst({
      where: {
        AND: [{ id: userId }, { refreshToken: refreshToken }],
      },
    });
    return user;
  }

  async refreshTokens(user) {
    const payload = { sub: user.sub, username: user.username };

    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);
    this.usersService.updateRefreshToken(user.sub, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
