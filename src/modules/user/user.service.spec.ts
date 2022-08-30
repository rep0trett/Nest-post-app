import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserCreateDTO } from './dto/user.create.dto';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation(async (dto: UserCreateDTO) => {
      return {
        id: Date.now(),
        email: dto.email,
        created_at: Date.now(),
      };
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', async () => {
    const userDTO = {
      email: 'user@gmail.com',
      password: 'mci21c3mi1c',
    };

    expect(await service.create(userDTO)).toEqual({
      id: expect.any(Number),
      email: userDTO.email,
      created_at: expect.any(Number),
    });
  });
});
