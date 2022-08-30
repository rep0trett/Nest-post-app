import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserCreateDTO } from 'src/modules/user/dto/user.create.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/modules/user/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockUserRepo = {
    findOne: jest.fn().mockReturnValue((email: string) => {
      return {
        id: Date.now(),
        created_at: Date.now(),
        email,
      };
    }),
    save: jest.fn().mockReturnValue((dto: UserCreateDTO) => {
      return {
        id: Date.now(),
        created_at: Date.now(),
        email: dto.email,
      };
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/auth/signup (GET) [failure]', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({})
      .expect(400);
  });

  it('/auth/signup (GET) [failure]', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: '321mail.ru', password: '3213123123' })
      .expect(400);
  });

  afterAll(() => {
    app.close();
  });
});
