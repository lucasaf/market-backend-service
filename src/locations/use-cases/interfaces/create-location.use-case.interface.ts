import { CreateLocationDto } from '../../dto/create-location.dto';
import { Location } from '../../entities/location.entity';

export interface ICreateLocationUseCase {
  execute(createLocationDto: CreateLocationDto): Promise<Location>;
}
