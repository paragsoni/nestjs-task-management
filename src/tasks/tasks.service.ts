import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
}

/**
 * 

import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask, ITaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];
  constructor() {}
  getTasks(): ITask[] {
    return this.tasks;
  }

  getTasksBySearch(searchTaskDto: SearchTaskDto): ITask[] {
    let tasks: ITask[] = this.tasks;

    const { search, status } = searchTaskDto;

    if (search) {
      tasks = tasks.filter(
        (task) => task.name.includes(search) || task.details.includes(search),
      );
    }

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const { name, details } = createTaskDto;
    const newTask: ITask = {
      id: uuid(),
      name,
      details,
      status: ITaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  getTaskById(id: string): ITask {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return found;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskById(id: string, status: ITaskStatus): ITask {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks[taskIndex].status = status;
    return this.tasks[taskIndex];
  }
}
 */
