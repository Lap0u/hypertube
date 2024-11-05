import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { extractVideoDetails, humanFileSize } from './utils';

@Injectable()
export class ApibayService {
  private apibayClient = axios.create({
    baseURL: process.env.APIBAY_API_URL,
  });

  async findTorrents(imdbId: string) {
    const response = await this.apibayClient.get('/q.php', {
      params: {
        q: imdbId,
      },
    });
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
  }
}
