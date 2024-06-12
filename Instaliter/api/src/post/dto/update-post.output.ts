import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatePostOutput {
  @Field({ nullable: true })
  message?: string;
}
