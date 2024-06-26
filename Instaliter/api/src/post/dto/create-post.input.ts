import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  author: string;

  @Field()
  title: string;

  @Field()
  content: string;
}
