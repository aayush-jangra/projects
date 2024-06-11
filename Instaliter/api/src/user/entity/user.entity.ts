import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Column({nullable: true})
    @Field({nullable: true})
    lastName?: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    username: string;
}