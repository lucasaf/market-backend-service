import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { Product } from './product.entity';

@Entity()
export class ProductLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Location)
  location: Location;

  @Column('decimal')
  quantity: number;
}
