import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITaskStatus } from './tasks.model';
import { SearchTaskDto } from './dto/search-task.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  private readonly logger = new Logger('TaskController', {
    timestamp: true,
  });

  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { name, details } = createTaskDto;

    const task = this.create({
      name,
      details,
      status: ITaskStatus.OPEN,
      user,
    });

    await this.save(task);

    return task;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.findOneBy({ id, user });

    if (!found) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return found;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: ITaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.save(task);
    return task;
  }

  async getTasks(searchTaskDto: SearchTaskDto, user: User): Promise<Task[]> {
    const { status, search } = searchTaskDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.name) LIKE LOWER(:search) OR LOWER(task.details) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    query.andWhere({ user });

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${user.username}". 
         Filters: ${JSON.stringify(SearchTaskDto)}. 
         error: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
