import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
@Injectable()
export class TaskService {
  constructor() {}
  getAll(): Task[] {
    return [];
  }

  addTask(task: Task): void {
    console.log(task);
  }
}
