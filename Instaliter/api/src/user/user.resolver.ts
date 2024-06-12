import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateUserOutput } from './dto/update-user.output';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => User, { nullable: true })
  userFromUsername(
    @Args('username', { type: () => String }) username: string,
  ): Promise<User | null> {
    return this.userService.getUserByUsername(username);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UpdateUserOutput)
  updateUser(
    @Args('username', { type: () => String }) username: string,
    @Args('updatedInformation') updatedInformation: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    return this.userService.updateUser(username, updatedInformation);
  }

  @Mutation(() => UpdateUserOutput)
  deleteUser(
    @Args('username', { type: () => String }) username: string,
  ): Promise<UpdateUserOutput> {
    return this.userService.deleteUser(username);
  }
}
