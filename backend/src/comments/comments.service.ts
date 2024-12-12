import { Injectable } from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService,
    private moviesService: MoviesService,
  ) {}

  async getComments() {
    return await this.prisma.comment.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  async getUserComments(authorId: number) {
    return await this.prisma.comment.findMany({
      where: {
        authorId,
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
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
    const movieExist = await this.moviesService.getMovie(movieId);
    if (!movieExist) {
      return null;
    }
    return await this.prisma.comment.create({
      data: {
        content,
        authorId,
        movieId,
      },
    });
  }
}
