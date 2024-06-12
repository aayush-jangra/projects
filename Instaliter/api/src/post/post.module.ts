import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  providers: [PostService, PostResolver]
})
export class PostModule {}
