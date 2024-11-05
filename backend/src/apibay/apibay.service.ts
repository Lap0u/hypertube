import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { extractVideoDetails, humanFileSize } from './utils';

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
      if (response.data[0].name === 'No results returned') {
        return [];
      }
      const torrents = response.data.map((torrent) => {
        const { quality, type } = extractVideoDetails(torrent.name);
        const humanReadableSize = humanFileSize(Number(torrent.size));
        return {
          source: 'APIBAY',
          hash: torrent.info_hash,
          quality: quality,
          seeds: Number(torrent.seeders),
          peers: Number(torrent.leechers),
          size: humanReadableSize,
          type: type,
        };
      });
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
