import { Controller, Get, Header, Param, Post, Query, Res, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { StreamService } from './stream.service';
import { Response } from 'express';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-auth.guards';

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
      const stream = await this.streamService.streamTorrent(hash, pageId, false);

      res.set({
        'Content-Type': 'video/mp4', // Adjust based on your use case -> mp4
        'Transfer-Encoding': 'chunked',
      });

      stream.pipe(res);
    } catch (error) {
      console.error('Error streaming file:', error);
      res.status(500).send('Failed to stream the file.');
    }
  }

  @Post('stopEngine')
  async leaveOrReloadPage(
    // @Query('hash') hash: string,
    @Query('pageId') pageId: string,
    @Res({passthrough: true}) res : Response
  ) {
    try {
      await this.streamService.stopEngine(pageId)
    } catch (error) {
      console.error('Error stopping engine:', error);
      throw new BadRequestException("Failed to stop engine")
    }
    return 'Engine Succesfully stopped'
  }

//   @Get('Download')
//   async downloadVideo(
//     @Query('magnetLink') magnetLink: string,
//     @Res() res: Response,
//   ) {

	// res.set({
	// 	'Content-Type': 'application/octet-stream', // Adjust based on your use case
	// 	'Transfer-Encoding': 'chunked',
	//   });
//     return this.streamService.streamTorrent(magnetLink, true);
//   }
}
