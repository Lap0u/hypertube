import { BadRequestException, Injectable } from '@nestjs/common';
import { UserInfos } from 'src/auth/strategies/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  saltOrRounds: number = 10;

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

  async findAll(limit: number, page: number) {
    return await this.prisma.user.findMany({
      skip: limit * (page - 1),
      take: limit,
      select: {
        id: true,
        username: true,
        profilePictureUrl: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        profilePictureUrl: true,
      },
    });
  }

  async createUser(userInfos: UserInfos, profilePictureUrl: string | null) {
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
    let updateData = {
      ...dto,
    };

    if (profilePictureUrl) {
      updateData['profilePictureUrl'] = profilePictureUrl;
    }
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateData,
      },
    });
  }

  async updatePassword(id: number, password: string) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });
  }
}
