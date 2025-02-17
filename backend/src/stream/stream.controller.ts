import { Controller, Get, Header, Param, Post, Query, Res, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { StreamService } from './stream.service';
import { Response } from 'express';

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get('')
  async streamVideo(
    @Query('hash') hash: string,
    @Query('pageId') pageId: string,
    @Res() res: Response,
  ) {
    try {
      const stream = await this.streamService.streamTorrent(hash, pageId);

      res.set({
        'Content-Type': 'video/webm', // Adjust based on your use case -> mp4
        'Transfer-Encoding': 'chunked',
      });

      stream.pipe(res);
    } catch (error) {
      res.status(500).send('Failed to stream the file.');
    }
  }

  @Post('stopEngine')
  async leaveOrReloadPage(
      @Query('pageId') pageId: string,
      @Res() res : Response
  ) {
    try {
      await this.streamService.stopEngine(pageId)
      res.status(200).send('Engine Successfully stopped');
    } catch (error) {
      res.status(400).send('Failed to stop engine');
    }
  }
}