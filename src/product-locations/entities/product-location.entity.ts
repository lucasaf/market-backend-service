import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class ProductLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.productLocations)
  product: Product;

  @ManyToOne(() => Location, (location) => location.productLocations)
  location: Location;

  @Column('decimal')
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
