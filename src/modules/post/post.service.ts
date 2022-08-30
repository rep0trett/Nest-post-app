import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { dataSource } from '../../config/db/data-source';
import { UserService } from '../user/user.service';
import { PostCreateDTO } from './dto/post.create.dto';
import { PostEntity } from './post.entity';
import { FindQuery } from './post.types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postRepo: Repository<PostEntity>,
    private userService: UserService,
  ) {}

  async create(postDTO: PostCreateDTO, userId: number) {
    const user = await this.userService.findById(userId);
    const _post = { ...postDTO, author: user };

    return await this.postRepo.save(_post);
  }

  async findOne(id: number) {
    return await this.postRepo.findOne({ where: { id } });
  }

  async delete(postId: number, userId: number) {
    const { affected } = await dataSource
      .createQueryBuilder()
      .delete()
      .from(PostEntity)
      .where('id = :id and authorId = :authorId', {
        id: postId,
        authorId: userId,
      })
      .execute();

    if (affected === 0) {
      throw new NotFoundException();
    }

    return postId;
  }

  async find(query: FindQuery) {
    const { page: _page = 1 } = query;
    const page = Number(_page);
    const curPage = page <= 1 ? 1 : page;
    const step = 20;
    const skip = curPage === 1 ? 0 : step * (curPage - 1);

    const [data, total] = await this.postRepo.findAndCount({
      // where: {}
      order: { created_at: 'DESC' },
      take: step,
      skip,
    });

    return {
      data,
      total,
    };
  }
}
