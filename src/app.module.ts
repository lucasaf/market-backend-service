import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import validationSchema from '../config/validation.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LocationsModule } from './locations/locations.module';
import { ProductModule } from './products/product.module';
import { ProductLocationsModule } from './product-locations/product-locations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config/.env',
      validationSchema,
    }),
    DatabaseModule,
    ProductModule,
    LocationsModule,
    ProductLocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
