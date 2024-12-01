import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { FortyTwoUser } from './types';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'fortytwo') {
  constructor() {
    super({
      clientID: process.env.FORTYTWO_CLIENT_ID,
      clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
      callbackURL: process.env.FORTYTWO_CALLBACK_URL,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const user: FortyTwoUser = {
      email: profile._json.email,
      username: profile.username,
      familyName: profile.name.familyName,
      givenName: profile.name.givenName,
      image: profile._json.image.link,
    };
    done(null, user);
  }
}
