import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from '../services/locations.service';
import { LocationsController } from './locations.controller';

describe('LocationsController', () => {
  let controller: LocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [LocationsService],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
