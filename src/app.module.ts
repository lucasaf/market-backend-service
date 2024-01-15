import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import validationSchema from '../config/validation.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { LocationsModule } from './locations/locations.module';
import { ProductLocationsModule } from './product-locations/product-locations.module';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config/.env',
      validationSchema,
    }),
    MulterModule.register({
      dest: './images',
    }),
    DatabaseModule,
    ProductModule,
    LocationsModule,
    ProductLocationsModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
