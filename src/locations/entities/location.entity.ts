import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductLocation } from '../../product-locations/entities/product-location.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(
    () => ProductLocation,
    (productLocation) => productLocation.location,
  )
  productLocations: ProductLocation[];
}
