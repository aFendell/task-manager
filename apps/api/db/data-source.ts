import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

export const getTypeOrmConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get('HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/**/*.js'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  logging: true,
  synchronize: false,
});

const typeOrmConfig = getTypeOrmConfig(configService);

export const dataSourceOptions: DataSourceOptions = {
  ...typeOrmConfig,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
