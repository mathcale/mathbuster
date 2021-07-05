import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rentals')
export class Rental {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  movieId: string;

  @Column()
  customerId: string;

  @Column()
  @ApiProperty({ readOnly: true })
  scheduledReturnDate: Date;

  @Column({ nullable: false })
  @ApiProperty()
  returned: boolean;

  @CreateDateColumn()
  @ApiProperty({ readOnly: true })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ readOnly: true })
  updatedAt: Date;

  constructor(rental?: Partial<Rental>) {
    Object.assign(this, rental);
  }

  @BeforeInsert()
  beforeInsertActions() {
    this.returned = false;
  }
}
