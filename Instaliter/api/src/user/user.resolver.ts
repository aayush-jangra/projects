import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => [User])
    users(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}
