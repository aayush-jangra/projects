import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RequestStatus } from '../schema/friendship.schema';

registerEnumType(RequestStatus, {
  name: 'RequestStatus',
});

@Entity()
@ObjectType()
export class Friendship {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  initiatingUser: string;

  @Column()
  @Field()
  respondingUser: string;

  @Column({
    type: 'enum',
    enum: RequestStatus,
  })
  @Field(() => RequestStatus)
  requestStatus: RequestStatus;
}
