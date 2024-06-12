import { Injectable } from '@nestjs/common';
import { Post } from './entity/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}

  getPostById(id: number): Promise<Post | null> {
    const post = this.postRepository.findOne({
      where: {
        id,
      },
    });

    return post;
  }

  getAllPosts(): Promise<Post[]> {
    const posts = this.postRepository.find();

    return posts;
  }

  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    const author = await this.userService.getUserByUsername(createPostInput.author);

    console.log("=======", author)

    if (!author) {
      throw new Error(
        `No user exists with username: ${createPostInput.author}`,
      );
    }

    const newPost = this.postRepository.create(createPostInput);

    return this.postRepository.save(newPost);
  }

  async updatePost(updatedInformation: UpdatePostInput) {
    const { id, ...rest } = updatedInformation;
    const post = await this.getPostById(id);

    if (!post) {
      throw new Error(`No such post found`);
    }

    const { affected } = await this.postRepository.update({ id }, rest);
    if (affected === 0) {
      throw new Error('There was an error updating the post information');
    }

    return { message: 'Post updated successfully' };
  }

  async deletePost(id: number) {
    const post = await this.getPostById(id);

    if (!post) {
      throw new Error(`No such post found`);
    }

    const { affected } = await this.postRepository.delete({ id });
    if (affected === 0) {
      throw new Error('There was an error deleting the post');
    }

    return { message: 'Post deleted successfully' };
  }
}
