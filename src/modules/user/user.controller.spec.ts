import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  const mockUserRepo = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    userController = moduleRef.get(UserController);
    userService = moduleRef.get(UserService);
  });

  it('should be controller defined', () => {
    expect(userController).toBeDefined();
  });

  it('should be service defined', () => {
    expect(userService).toBeDefined();
  });

  it('create user', async () => {
    const dto = {
      email: 'mail@m.com',
      password: '321_78mbo_1',
    };
    const user = {
      ...dto,
      id: 1,
      created_at: new Date(),
    };

    jest.spyOn(userService, 'create').mockImplementation(async () => user);

    expect(await userController.create(dto)).toBe(user);
  });
});
