import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITaskStatus } from './tasks.model';

@Injectable()
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { name, details } = createTaskDto;

    const task = this.create({
      name,
      details,
      status: ITaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }
}
