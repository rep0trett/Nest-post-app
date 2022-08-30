import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity('users')
export class UserEntity {
  @ApiProperty({ example: 537, description: 'Unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'alexbrown@gmail.com', description: 'User email' })
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: false, nullable: false, select: false })
  password: string;

  @ApiProperty({
    example: '2015-01-10T13:27:04.635Z',
    description: 'User creation date',
  })
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => PostEntity, (post) => post.author)
  // @JoinTable()
  posts?: PostEntity[];
}
