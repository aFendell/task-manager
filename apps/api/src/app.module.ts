import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configValidationSchema } from './config.schema';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { getTypeOrmConfig } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'client', 'dist'),
      renderPath: '/',
    }),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
