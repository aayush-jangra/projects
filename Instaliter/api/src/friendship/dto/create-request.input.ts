import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateRequestInput {
  @Column()
  @Field()
  initiatingUser: string;

  @Column()
  @Field()
  respondingUser: string;
}
