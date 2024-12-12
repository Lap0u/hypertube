import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Incoming Request:', req.method, req.originalUrl, req.cookies);
    console.log(req.cookies[process.env.REFRESH_TOKEN_NAME]);
    next();
  }
}
