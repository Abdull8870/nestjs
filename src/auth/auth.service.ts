import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async createUser(authDto: AuthDto) {
    const hashedPassword = await argon.hash(authDto.password);
    const user = await this.prisma.user.create({
      data: {
        email: authDto.email,
        password: hashedPassword,
      },
    });
    delete user.password;
    return user;
  }

  async login(authDto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: authDto.email },
    });

    if (!user || !(await argon.verify(user.password, authDto.password))) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.jwtSign(user.id, user.email);
  }

  async jwtSign(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const secret = process.env.SECRET;
    const token = await this.jwt.sign(payload, {
      expiresIn: '20min',
      secret: secret,
    });

    return {
      accessToken: token,
    };
  }

  async getUser(id: number) {
    console.log('Inside service');
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        bookmarks: true,
      },
    });

    delete user.password;
    return user;
  }
}
