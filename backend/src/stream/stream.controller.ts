import { Controller, Get, Header, Param, Post, Query, Res, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { StreamService } from './stream.service';
import { Response } from 'express';
// import { join } from 'path';
// import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-auth.guards';
// import { error } from 'console';
import { console } from 'inspector';

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
      console.error('Error streaming file:', error);
      res.status(500).send('Failed to stream the file.');
    }
  }

  @Get('subtitles')
  async getSubtitles(
    @Query('hash') hash: string,
    @Query('pageId') pageId: string,
    @Res() res: Response,
  ) {
    try {
      // Serve the appropriate subtitle file.
      // Adjust the path to subtitle files based on your use case.
      const subtitlePath = await this.streamService.sendSubtitle(hash)

      res.set({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'text/vtt',
      });

      res.send(subtitlePath);
    } catch (error) {
      console.error('Error serving subtitle file:', error);
      res.status(404).send('Failed to serve the subtitle file.');
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
      console.error('Error stopping engine:', error);
      res.status(400).send('Failed to stop engine');
    }
  }
}