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
  title: string;

  @Column({ nullable: false })
  overview: string;

  @Column({ nullable: false })
  genres: string[];

  @Column({ nullable: false })
  releaseDate: string;

  @Column({ nullable: false })
  isAdult: boolean;

  @Column({ nullable: false })
  availableCopies: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: false, select: false })
  enabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(movie?: Partial<Movie>) {
    Object.assign(this, movie);
  }

  @BeforeInsert()
  beforeInsertActions() {
    this.enabled = true;
  }
}
