import { Column, Entity, Index, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, Timestamp } from 'typeorm';

@Entity('jobs', { schema: 'public' })
export class Jobs extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Index()
  @Column('character varying', { name: 'name', nullable: false })
  name: string;

  @Index()
  @Column('integer', { name: 'salary', nullable: false })
  salary: number;

  @Index()
  @Column('character varying', { name: 'country', nullable: false })
  country: string;

  @Index()
  @Column('simple-array', { name: 'skills', nullable: false })
  skills: string[];

  @Index()
  @Column('timestamp without time zone')
  createdAt: Date;
}
