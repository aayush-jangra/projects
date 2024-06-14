import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipResolver } from './friendship.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friendship } from './entity/friendship.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Friendship]), UserModule],
  providers: [FriendshipService, FriendshipResolver],
})
export class FriendshipModule {}
