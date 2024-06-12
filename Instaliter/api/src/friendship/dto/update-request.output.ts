import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateRequestOutput {
  @Field({ nullable: true })
  message?: string;
}
