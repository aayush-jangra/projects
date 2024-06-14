import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  author: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;
}
