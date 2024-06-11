import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ITaskStatus } from './tasks.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  details: string;

  @Column()
  status: ITaskStatus;
}
