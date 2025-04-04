import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Order from './Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('orders')
class OrderProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: string;

  @Column()
  order_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderProducts;
