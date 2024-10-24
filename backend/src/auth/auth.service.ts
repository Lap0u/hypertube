import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async signIn(loginDto: LoginDto) {
    const { email, username, password } = loginDto;
    let user;
    if (email) {
      user = await this.usersService.findUserByEmail(email);
    } else if (username) {
      user = await this.usersService.findUserByUsername(username);
    }
    if (!user || (!email && !username)) {
      throw new NotFoundException();
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
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
}
