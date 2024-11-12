import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { transformApibayFindTorrentsResponse } from './transform.utils';

@Injectable()
export class ApibayService {
  private apibayClient = axios.create({
    baseURL: process.env.APIBAY_API_URL,
  });

  async findTorrents(imdbId: string) {
    try {
      const response = await this.apibayClient.get('/q.php', {
        params: {
          q: imdbId,
        },
      });
      const torrents = transformApibayFindTorrentsResponse(response);
      return torrents;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fetch movie torrents from apibay',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
