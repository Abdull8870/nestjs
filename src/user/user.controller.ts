import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private authService: AuthService) {}
  @Get('user')
  async getUser(@GetUser() user: User) {
    return await this.authService.getUser(user.id);
  }
}
