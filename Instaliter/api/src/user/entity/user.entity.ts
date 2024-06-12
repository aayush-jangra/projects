import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "src/post/entity/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Post, post => post.author)
    @Field(() => [Post], {nullable: true})
    posts?: Post[]
}