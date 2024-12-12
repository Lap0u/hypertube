import { Controller, Get, Header, Param, Query, Res } from '@nestjs/common';
import { StreamService } from './stream.service';
import { Response } from 'express';

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get('')
  async streamVideo(
    @Query('magnetLink') magnetLink: string,
    @Res() res: Response,
  ) {
    try {
      const stream = await this.streamService.streamTorrent(magnetLink, false);

      res.set({
        'Content-Type': 'video/mp4', // Adjust based on your use case
        'Transfer-Encoding': 'chunked',
      });

      stream.pipe(res);
    } catch (error) {
      console.error('Error streaming file:', error);
      res.status(500).send('Failed to stream the file.');
    }
  }

//   @Get('Download')
//   async downloadVideo(
//     @Query('magnetLink') magnetLink: string,
//     @Res() res: Response,
//   ) {
//     return this.streamService.streamTorrent(magnetLink, true);
//   }
}
