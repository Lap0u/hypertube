import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { SubtitlesService } from './subtitles.service'
import { SubtitleDto } from './dto/subtitiles.dto';

@Controller('subtitles')
export class SubtitlesController {
    constructor(private readonly streamService: SubtitlesService) {}
  
  @Get()
  async getSubtitles(
    @Query('imdb_id') imdbId: string,
    @Query('userId') userId: number,
    @Res() res: Response,
  ) {
    try {
      userId = Number(userId)
      const fileId = await this.streamService.getFileId(imdbId, userId)
      const subtitleURL = await this.streamService.downloadFile(fileId)
      const subtitlesDto : SubtitleDto[] = await this.streamService.getSubtitlesDto(subtitleURL, userId)
      res.set({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'text/vtt',
      });
      res.send(subtitlesDto);
    } catch (error) {
      console.error(error)
    }
  }
}
