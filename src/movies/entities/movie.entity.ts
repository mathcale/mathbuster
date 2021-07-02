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

@Entity('movies')
export class Movie {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  @Index({ unique: true })
  @ApiProperty()
  title: string;

  @Column({ nullable: false })
  @ApiProperty()
  overview: string;

  @Column({ nullable: false })
  @ApiProperty()
  genres: string[];

  @Column({ nullable: false })
  @ApiProperty()
  releaseDate: string;

  @Column({ nullable: false })
  @ApiProperty()
  isAdult: boolean;

  @Column({ nullable: false })
  @ApiProperty()
  availableCopies: number;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  imageUrl?: string;

  @Column({ nullable: false, select: false })
  @ApiProperty()
  enabled: boolean;

  @CreateDateColumn()
  @ApiProperty({ readOnly: true })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ readOnly: true })
  updatedAt: Date;

  constructor(movie?: Partial<Movie>) {
    Object.assign(this, movie);
  }

  @BeforeInsert()
  beforeInsertActions() {
    this.enabled = true;
  }
}
