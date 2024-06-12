import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserOutput {
  @Field({ nullable: true })
  message?: string;
}
