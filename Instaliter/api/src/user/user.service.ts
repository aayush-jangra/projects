import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    async getAllUsers(): Promise<User[]> {
        return [{
            id: 1,
            firstName: 'lol',
            username: 'asda',
            email: "asd",
            friends: []
        }]
    }
}
