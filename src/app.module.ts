import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './config/db/data-source';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSource.options),
    AuthModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
