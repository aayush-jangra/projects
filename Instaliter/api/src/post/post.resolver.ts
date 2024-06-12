import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entity/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostOutput } from './dto/update-post.output';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver()
export class PostResolver {
    constructor (private postService: PostService) {} 

    @Query(() => [Post])
  posts(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }

  @Query(() => Post, { nullable: true })
  postFromId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Post | null> {
    return this.postService.getPostById(id);
  }

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return this.postService.createPost(createPostInput);
  }

  @Mutation(() => UpdatePostOutput)
  updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<UpdatePostOutput> {
    return this.postService.updatePost(updatePostInput);
  }

  @Mutation(() => UpdatePostOutput)
  deletePost(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UpdatePostOutput> {
    return this.postService.deletePost(id);
  }
}
