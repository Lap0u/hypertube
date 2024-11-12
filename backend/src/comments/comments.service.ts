import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async getComments() {
    return await this.prisma.comment.findMany();
  }

  async getUserComments(authorId: number) {
    return await this.prisma.comment.findMany({
      where: {
        authorId,
      },
    });
  }

  async getMovieComments(movieId: string) {
    return await this.prisma.comment.findMany({
      where: {
        movieId,
      },
    });
  }

  async addComment(movieId: string, authorId: number, content: string) {
    return await this.prisma.comment.create({
      data: {
        content,
        authorId,
        movieId,
      },
    });
  }
}
