import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field()
    firstName: string;

    @Field({nullable: true})
    lastName?: string;

    @Field()
    email: string;

    @Field()
    username: string;
}