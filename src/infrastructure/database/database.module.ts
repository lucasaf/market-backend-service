import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import typeOrmConfig from './config/database.config';

export const databaseConfig: TypeOrmModuleOptions = typeOrmConfig;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return databaseConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
