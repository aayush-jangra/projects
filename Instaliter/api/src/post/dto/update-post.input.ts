import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;
}
