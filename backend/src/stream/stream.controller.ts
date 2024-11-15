import { Controller, Get, Header, Param, Query, Res } from '@nestjs/common';
import { StreamService } from './stream.service';
import { Response } from 'express';

@Controller('stream')
export class StreamController {
	constructor(
		private readonly streamService: StreamService
	) {}

	@Get('')
	@Header('Content-type', 'video/mp4')
	async streamVideo(
		@Query('magnetLink') magnetLink: string,
		@Res() res: Response
	) {	
		return this.streamService.streamTorrent(magnetLink, false)
	}

	@Get('Download')
	async downloadVideo(
		@Query('magnetLink') magnetLink: string,
		@Res() res: Response
	) {
		return this.streamService.streamTorrent(magnetLink, true)
	}
}
