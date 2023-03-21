import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity('subscription_jobs', { schema: 'public' })
export class SubscriptionJobs extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Index()
  @Column('character varying', { name: 'email', nullable: false })
  email: string;
}
