import { UpdateLocationDto } from '../../dto/update-location.dto';
import { Location } from '../../entities/location.entity';

export interface IUpdateLocationUseCase {
  execute(id: string, updateLocationDto: UpdateLocationDto): Promise<Location>;
}
