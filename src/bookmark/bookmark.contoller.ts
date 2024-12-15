import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { get } from 'http';
import { BookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get('mybookmarks')
  async getBookmarks(@GetUser() user, bookmarkDto: BookmarkDto) {
    return await this.bookmarkService.getBookmarks(bookmarkDto, user.id);
  }

  @Post('create')
  async createBookmark(@GetUser() user, @Body() bookmarkDto: any) {
    console.log({ bookmarkDto });
    return await this.bookmarkService.createBookmark(bookmarkDto, user.id);
  }

  @Put('Update')
  async updateBookmark(@GetUser() user, bookmarkDto: BookmarkDto) {
    return await this.bookmarkService.updateBookmark(bookmarkDto, user.id);
  }

  @Get('all')
  async getAllBookmarks() {
    return await this.bookmarkService.getAllBookmarks();
  } 
}
