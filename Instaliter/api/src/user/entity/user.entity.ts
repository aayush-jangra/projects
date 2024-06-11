import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field()
    firstName: string;

    @Field({nullable: true})
    lastName?: string;

    @Field()
    email: string;

    @Field()
    username: string;

    @Field(() => [String])
    friends: string[];
}