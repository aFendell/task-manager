import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';

import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async login(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const foundUser = await this.usersRepository.findOneBy({ username });

    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      const payload: JwtPayload = { username };
      const tokens = await this.getTokens(payload);

      foundUser.refreshToken = tokens.refreshToken;
      await this.usersRepository.save(foundUser);

      return tokens;
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }

  async refreshTokens(user: User) {
    const payload: JwtPayload = { username: user.username };

    const tokens = await this.getTokens(payload);

    user.refreshToken = tokens.refreshToken;
    await this.usersRepository.save(user);

    return tokens;
  }

  async logout(user: User) {
    user.refreshToken = null;
    await this.usersRepository.save(user);
  }

  async getTokens(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
