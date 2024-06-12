import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FriendshipService } from './friendship.service';
import { Friendship } from './entity/friendship.entity';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestOutput } from './dto/update-request.output';
import { User } from 'src/user/entity/user.entity';

@Resolver()
export class FriendshipResolver {
  constructor(private friendshipService: FriendshipService) {}

  @Query(() => [Friendship])
  allFriendships(): Promise<Friendship[]> {
    return this.friendshipService.allFriendships();
  }

  @Query(() => [User])
  friends(
    @Args('username', { type: () => String }) username: string,
  ): Promise<User[]> {
    return this.friendshipService.getFriends(username);
  }

  @Mutation(() => Friendship)
  createFriendRequest(
    @Args('createRequestInput') createRequestInput: CreateRequestInput,
  ): Promise<Friendship> {
    return this.friendshipService.createFriendRequest(createRequestInput);
  }

  @Mutation(() => UpdateRequestOutput)
  declineFriendRequest(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UpdateRequestOutput> {
    return this.friendshipService.deleteFriendRequest(id);
  }

  @Mutation(() => UpdateRequestOutput)
  acceptFriendRequest(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UpdateRequestOutput> {
    return this.friendshipService.acceptFriendRequest(id);
  }

  @Mutation(() => UpdateRequestOutput)
  removeFriend(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UpdateRequestOutput> {
    return this.friendshipService.deleteFriendRequest(id);
  }
}
