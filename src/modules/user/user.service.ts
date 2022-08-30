import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/user.create.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create(dto: UserCreateDTO) {
    const user = await this.userRepo.save(dto);

    return user;
  }

  async findByEmail(
    email: string,
    selectPass = false,
  ): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({
      where: { email },
      select: {
        email: true,
        id: true,
        created_at: true,
        password: selectPass,
      },
    });

    return user;
  }

  async findById(id: number, selectPass = false): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({
      where: { id },
      select: {
        email: true,
        id: true,
        created_at: true,
        password: selectPass,
      },
    });

    return user;
  }
}
