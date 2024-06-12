import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Post {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    author: string;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    content: string;
}