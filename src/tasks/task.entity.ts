import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ITaskStatus } from './tasks.model';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

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

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
