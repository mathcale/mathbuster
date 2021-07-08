import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customers')
export class Customer {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: false })
  @ApiProperty()
  age: number;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  email?: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  @ApiProperty()
  phone: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  favoriteGenres?: string[];

  @Column({ nullable: false })
  @ApiProperty()
  address: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  complement?: string;

  @Column({ nullable: false })
  @ApiProperty()
  number: string;

  @Column({ nullable: false })
  @ApiProperty()
  neighborhood: string;

  @Column({ nullable: false })
  @ApiProperty()
  city: string;

  @Column({ nullable: false })
  @ApiProperty()
  zipCode: string;

  @Column({ nullable: false, length: 2 })
  @ApiProperty()
  state: string;

  @Column({ nullable: false, length: 3 })
  @ApiProperty()
  country: string;

  @Column({ nullable: false, select: false })
  @ApiProperty()
  secret: string;

  @Column({ nullable: false, select: false })
  @ApiProperty()
  enabled: boolean;

  @CreateDateColumn()
  @ApiProperty({ readOnly: true })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ readOnly: true })
  updatedAt: Date;

  constructor(customer?: Partial<Customer>) {
    Object.assign(this, customer);
  }

  @BeforeInsert()
  beforeInsertActions() {
    this.enabled = true;
  }
}
