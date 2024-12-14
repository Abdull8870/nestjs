import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.contoller';
import { BookmarkService } from './bookmark.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService],
  imports: [PrismaModule],
})
export class BookmarkModule {}
