import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { jwtConstants } from './jwt.constant';
import { FortyTwoUser, GoogleUser } from './strategies/types';

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

  async signUp(payload: CreateUserDto, profilePictureUrl: string | null) {
    const hashPass: string = await bcrypt.hash(
      payload.password,
      this.saltOrRounds,
    );

    let data = {
      ...payload,
      password: hashPass,
    };

    const user = await this.usersService.createUser(data, profilePictureUrl);
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

  async googleSignIn(googleUser?: GoogleUser) {
    if (!googleUser) {
      throw new BadRequestException('Unauthenticated');
    }

    let user = await this.usersService.findUserByEmail(googleUser.email);

    if (!user) {
      const newUserInfos = {
        username: googleUser.firstName + googleUser.lastName + uuidv4(),
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        preferredLanguage: 'en',
      };

      user = await this.usersService.createUser(
        newUserInfos,
        googleUser.picture,
      );
    }
    const payload = { sub: user.id, username: user.username };

    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);
    this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async fortyTwoSignIn(fortytwoUser?: FortyTwoUser) {
    if (!fortytwoUser) {
      throw new BadRequestException('Unauthenticated');
    }

    let user = await this.usersService.findUserByEmail(fortytwoUser.email);

    if (!user) {
      const newUserInfos = {
        username: fortytwoUser.username + uuidv4(),
        email: fortytwoUser.email,
        firstName: fortytwoUser.givenName,
        lastName: fortytwoUser.familyName,
        preferredLanguage: 'en',
      };

      user = await this.usersService.createUser(
        newUserInfos,
        fortytwoUser.image,
      );
    }
    const payload = { sub: user.id, username: user.username };

    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);
    this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
