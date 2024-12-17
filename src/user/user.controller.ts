import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Inject,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Cache } from 'cache-manager';
import { combineLatest } from 'rxjs';
import { Client } from '@nestjs/microservices/external/nats-client.interface';
import { ClientProxy } from '@nestjs/microservices';
import e from 'express';

@UseInterceptors(CacheInterceptor)
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
  ) {}
  @Get('user')
  async getUser(@GetUser() user: User) {
    await this.cacheManager.set('userid', user.id);
    await this.cacheManager.set('hi', 'stored in redis', 60);
    const payload = {
      userId: user.id,
      email: user.email,
    };
    await this.notificationService.emit('notification', payload);
    console.log('Inside controller');
    console.log(await this.cacheManager.get('hi'));
    return await this.authService.getUser(user.id);
  }
}
