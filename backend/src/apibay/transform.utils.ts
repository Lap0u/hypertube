import { AxiosResponse } from 'axios';
import { extractVideoDetails, humanFileSize } from './utils';

export const transformApibayFindTorrentsResponse = (
  response: AxiosResponse,
) => {
  const data = response.data;

  if (data[0].name === 'No results returned') {
    return [];
  }

  const torrents = data.map((torrent) => {
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
};
