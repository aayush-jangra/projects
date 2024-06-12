import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUserByUsername(username: string): Promise<User | null> {
    const user = this.userRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  getAllUsers(): Promise<User[]> {
    const users = this.userRepository.find();

    return users;
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const existingUser = await this.getUserByUsername(createUserInput.username);

    if (existingUser) {
      throw new Error('Username already exists');
    }

    const newUser = this.userRepository.create(createUserInput);

    return this.userRepository.save(newUser);
  }

  async updateUser(username: string, updatedInformation: UpdateUserInput) {
    const existingUser = await this.getUserByUsername(username);

    if (!existingUser) {
      throw new Error(`No user found with username: ${username}`);
    }

    const { affected } = await this.userRepository.update(
      { username },
      updatedInformation,
    );
    if(affected === 0) {
      throw new Error ('There was an error updating the user information')
    }

    return { message: 'User updated successfully' };
  }

  async deleteUser(username: string) {
    const existingUser = await this.getUserByUsername(username);

    if (!existingUser) {
      throw new Error(`No user found with username: ${username}`);
    }

    const { affected } = await this.userRepository.delete(
      { username },
    );
    if(affected === 0) {
      throw new Error ('There was an error deleting the user information')
    }

    return { message: 'User deleted successfully' };
  }
}
