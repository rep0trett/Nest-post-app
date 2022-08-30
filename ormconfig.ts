import { DataSourceOptions } from 'typeorm';
import { PostEntity } from './src/modules/post/post.entity';
import { UserEntity } from './src/modules/user/user.entity';

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, PostEntity],
  // entities: [__dirname + '/src/**/*.entity.{js,ts}'],
  logger: 'debug',
  synchronize: false,
  migrations: ['src/migrations/**/*{.ts,.js}'],
};

export default ormConfig;
