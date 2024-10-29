import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { YtsService } from 'src/yts/yts.service';

@Injectable()
export class MoviesService {
  constructor(
    private prisma: PrismaService,
    private ytsService: YtsService,
  ) {}

  async getMovies(page: number = 1, limit: number = 20) {
    return await this.ytsService.getMovies(page, limit);
  }

  async getDetails(tmdb_id: number) {}
}
