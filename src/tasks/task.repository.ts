import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITaskStatus } from './tasks.model';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

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

  async getTaskById(id: string): Promise<Task> {
    const found = await this.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return found;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }

  async updateTaskStatus(id: string, status: ITaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.save(task);
    return task;
  }

  async getTasks(searchTaskDto: SearchTaskDto): Promise<Task[]> {
    const { status, search } = searchTaskDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.name) LIKE LOWER(:search) OR LOWER(task.details) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
