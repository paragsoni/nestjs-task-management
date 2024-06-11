import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  getAll() {
    this.taskService.getAll();
  }

  @Post()
  addTask(@Body('name') name, @Body('description') description): any {
    const task: Task = {
      id: uuid(),
      name,
      description,
      status: TaskStatus.OPEN,
    };
    this.taskService.addTask(task);
  }
}
