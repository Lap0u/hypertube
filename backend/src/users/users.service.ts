import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async createUser(userInfos: CreateUserDto, profilePictureUrl: string | null) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: userInfos.email,
          },
          {
            username: userInfos.username,
          },
        ],
      },
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    return await this.prisma.user.create({
      data: {
        ...userInfos,
        refreshToken: '',
        profilePictureUrl: profilePictureUrl,
      },
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
  }

  async updateUser(
    id: number,
    dto: UpdateUserDto,
    profilePictureUrl: string | null,
  ) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        profilePictureUrl: profilePictureUrl,
      },
    });
  }
}
