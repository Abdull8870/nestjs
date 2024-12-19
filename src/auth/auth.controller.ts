import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import { AuthDto, UserDto } from './dto';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/exception/exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  @Post('user')
  async create(@Body() authDto: AuthDto) {
    const user: UserDto = await this.authService.createUser(authDto);
    return user;
  }

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.login(authDto);
    return user;
  }
}
