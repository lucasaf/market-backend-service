import { ConfigService } from '@nestjs/config';
import { config as setConfig } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

setConfig({ path: 'config/.env' });
const configService = new ConfigService();

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_DATABASE'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsRun: true,
};

export default databaseConfig;
