import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
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

  async validateUserByName(loginDto: LoginDto) {
    const { username, password } = loginDto;
    let user = null;
    if (username) {
      user = await this.usersService.findUserByUsername(username);
    }
    if (
      !user ||
      !password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateUserById(userId: number, password: string) {
    let user = null;
    if (userId) {
      user = await this.usersService.findUserById(userId);
    }
    if (
      !user ||
      !password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validatePassword(password: string, cryptedPassword: string) {
    if (!password || !(await bcrypt.compare(password, cryptedPassword))) {
      return false;
    }
    return true;
  }

  async signIn(loginDto: LoginDto) {
    let userExist = await this.usersService.findUserByUsername(
      loginDto.username,
    );
    if (
      !userExist ||
      !(await this.validatePassword(loginDto.password, userExist.password))
    ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: userExist.id, username: userExist.username };

    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);
    this.usersService.updateRefreshToken(userExist.id, refreshToken);

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

  async signOut(userId: number) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: '',
      },
    });
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
    const payload = { sub: user.id, username: user.username };

    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);
    this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async updatePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const userExist = await this.usersService.findUserById(userId);

    if (
      !userExist ||
      !(await this.validatePassword(currentPassword, userExist.password))
    ) {
      throw new UnauthorizedException();
    }
    const newHashedPassword: string = await bcrypt.hash(
      newPassword,
      this.saltOrRounds,
    );

    await this.usersService.updatePassword(userId, newHashedPassword);
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

  async getResetPasswordToken(token: string) {
    return await this.prisma.resetPasswordToken.findUnique({
      where: {
        token: token,
      },
    });
  }

  async deleteResetPasswordToken(token: string) {
    await this.prisma.resetPasswordToken.delete({
      where: {
        token: token,
      },
    });
  }

  async resetPassword(token: string, newPassword: string) {
    const resetPasswordRecord = await this.getResetPasswordToken(token);
    if (!resetPasswordRecord || resetPasswordRecord.expiredAt < new Date()) {
      throw new BadRequestException();
    }

    const hashedPassword: string = await bcrypt.hash(
      newPassword,
      this.saltOrRounds,
    );

    await this.usersService.updatePassword(
      resetPasswordRecord.userId,
      hashedPassword,
    );
    await this.deleteResetPasswordToken(token);
  }

  async createResetPasswordToken(email: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      return { token: null };
    }

    const now = new Date();

    const pendingResetPasswordTokens =
      await this.prisma.resetPasswordToken.findMany({
        where: {
          expiredAt: {
            gt: now,
          },
        },
      });

    if (pendingResetPasswordTokens.length !== 0) {
      return { token: null };
    }

    const token = uuidv4();
    const expirationDate = new Date(now.getTime() + 60 * 60 * 1000);
    return await this.prisma.resetPasswordToken.create({
      data: {
        token: token,
        userId: user.id,
        expiredAt: expirationDate,
      },
    });
  }
}
