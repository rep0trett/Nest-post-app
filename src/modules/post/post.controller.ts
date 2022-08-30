import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { IJWTData } from '../auth/auth.types';
import { User } from '../user/user.decorator';
import { PostCreateDTO } from './dto/post.create.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { FindQuery } from './post.types';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: 'create new post' })
  @ApiResponse({ status: HttpStatus.CREATED, type: PostEntity })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() postDTO: PostCreateDTO, @User() user: IJWTData) {
    const { userId } = user;
    return this.postService.create(postDTO, userId);
  }

  @ApiOperation({ summary: 'get posts' })
  @ApiResponse({ status: HttpStatus.OK, type: PostEntity })
  @Get()
  async find(@Query() query: FindQuery) {
    return this.postService.find(query);
  }

  @ApiOperation({ summary: 'get post by id' })
  @ApiResponse({ status: HttpStatus.OK, type: PostEntity })
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.postService.findOne(id);
  }

  @ApiOperation({ summary: 'delete post by id' })
  @ApiResponse({ status: HttpStatus.OK, type: PostEntity })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @User() user: IJWTData,
  ) {
    const { userId } = user;
    const deleted = await this.postService.delete(id, userId);

    return deleted;
  }
}
