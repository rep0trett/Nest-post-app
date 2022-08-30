import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('posts')
export class PostEntity {
  @ApiProperty({ example: 537, description: 'Unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Some post title', description: 'Post title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Some post content', description: 'Post content' })
  @Column()
  content: string;

  @ApiProperty({ example: new Date(), description: 'Post created date' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ example: UserEntity, description: 'Post author' })
  @ManyToOne(() => UserEntity, (user) => user.posts, { eager: true })
  author: UserEntity;
}
