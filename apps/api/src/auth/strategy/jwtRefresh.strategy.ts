import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { UsersRepository } from '../users.repository';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const { username } = payload;
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await this.usersRepository.save(user);

      throw new UnauthorizedException();
    }

    return user;
  }
}
