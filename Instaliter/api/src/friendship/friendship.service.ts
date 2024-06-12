import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friendship } from './entity/friendship.entity';
import { Repository } from 'typeorm';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestOutput } from './dto/update-request.output';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { RequestStatus } from './schema/friendship.schema';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
    private userService: UserService,
  ) {}

  allFriendships(): Promise<Friendship[]> {
    return this.friendshipRepository.find();
  }

  async getFriends(username: string): Promise<User[]> {
    const friendships = await this.friendshipRepository.find({
      where: [
        {
          initiatingUser: username,
          requestStatus: RequestStatus.ACCEPTED,
        },
        {
          respondingUser: username,
          requestStatus: RequestStatus.ACCEPTED,
        },
      ],
    });

    const friends = Promise.all(
      friendships.map(async (friendship) => {
        const friendUsername =
          friendship.initiatingUser === username
            ? friendship.respondingUser
            : friendship.initiatingUser;
        const friend = await this.userService.getUserByUsername(friendUsername);

        return friend;
      }),
    );

    return friends;
  }

  async getPendingRequests(username: string): Promise<Friendship[]> {
    const requests = await this.friendshipRepository.find({
      where: [
        {
          initiatingUser: username,
          requestStatus: RequestStatus.REQUESTED,
        },
        {
          respondingUser: username,
          requestStatus: RequestStatus.REQUESTED,
        },
      ],
    });

    return requests;
  }

  async createFriendRequest(
    createRequestInput: CreateRequestInput,
  ): Promise<Friendship> {
    const { initiatingUser, respondingUser } = createRequestInput;

    if (initiatingUser === respondingUser) {
      throw new Error('Sender and Recepient of request cannot be same');
    }

    const userOne = await this.userService.getUserByUsername(initiatingUser);
    if (!userOne) {
      throw new Error(`No user found with username: ${userOne}`);
    }

    const userTwo = await this.userService.getUserByUsername(respondingUser);
    if (!userTwo) {
      throw new Error(`No user found with username: ${userTwo}`);
    }

    const newRequest = this.friendshipRepository.create({
      ...createRequestInput,
      requestStatus: RequestStatus.REQUESTED,
    });

    return this.friendshipRepository.save(newRequest);
  }

  async acceptFriendRequest(id: number): Promise<UpdateRequestOutput> {
    const { affected } = await this.friendshipRepository.update(
      { id },
      { requestStatus: RequestStatus.ACCEPTED },
    );

    if (affected === 0) {
      throw new Error('There was an error accepting the request');
    }

    return {
      message: 'Friend request accepted',
    };
  }

  async deleteFriendRequest(id: number): Promise<UpdateRequestOutput> {
    const { affected } = await this.friendshipRepository.delete({ id });

    if (affected === 0) {
      throw new Error('There was an error deleting the request');
    }

    return {
      message: 'Friend request deleted',
    };
  }
}
