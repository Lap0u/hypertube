import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('jwt-access') {
  // canActivate(context: ExecutionContext) {
  //   console.log('JwtAccessAuthGuard activated');
  //   return super.canActivate(context);
  //   return true;
  // }
  // handleRequest(err, user, info) {
  //   if (err || !user) {
  //     console.log(
  //       'Unauthorized access attempt:',
  //       info?.message || err?.message,
  //     );
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}
