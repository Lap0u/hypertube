import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CommentsService } from './comments.service';
import { PostCommentsDto } from './dto/postComments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  getComments() {
    return this.commentsService.getComments();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard)
  postComments(@Query() postCommentsDto: PostCommentsDto, @Req() req) {
    const authorId = req.user.id;
    const { movieId, content } = postCommentsDto;
    return this.commentsService.addComment(movieId, authorId, content);
  }
}
