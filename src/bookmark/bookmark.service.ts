import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto } from './dto';

@Injectable({})
export class BookmarkService {
  getAllBookmarks() {
    return this.prisma.bookmark.findMany();
  }
  constructor(private prisma: PrismaService) {}

  async getBookmarks(bookmarkDto: BookmarkDto, id: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId: id,
      },
    });
    return bookmarks;
  }

  async createBookmark(bookmarkDto: BookmarkDto, userId: number) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        title: bookmarkDto.title,
        description: bookmarkDto.description,
        link: bookmarkDto.link,
        userId: userId,
      },
    });
    return bookmark;
  }

  async updateBookmark(bookmarkDto: BookmarkDto, id: number) {
    const bookmark = await this.prisma.bookmark.update({
      where: {
        id: id,
      },
      data: {
        title: bookmarkDto.title,
        description: bookmarkDto.description,
        link: bookmarkDto.link,
      },
    });
    return bookmark;
  }
}
