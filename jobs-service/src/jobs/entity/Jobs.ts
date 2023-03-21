import { Column, Entity, Index, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('jobs', { schema: 'public' })
export class Jobs extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Index()
  @Column('character varying', { name: 'salary', nullable: false })
  name: string;

  @Index()
  @Column('integer', { name: 'salary', nullable: false })
  salary: number;

  @Index()
  @Column('character varying', { name: 'country', nullable: false })
  country: string;

  @Index()
  @Column({ name: 'skills', nullable: false })
  skils: string[];
}
