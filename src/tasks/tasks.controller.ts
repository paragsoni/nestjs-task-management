import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
}

/**
 * 
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ITask, ITaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  async getTasks(@Query() searchTaskDto: SearchTaskDto): Promise<ITask[]> {
    if (Object.keys(searchTaskDto).length) {
      return this.tasksService.getTasksBySearch(searchTaskDto);
    }
    return this.tasksService.getTasks();
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<ITask> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  async getTasksById(@Param('id') id: string): Promise<ITask> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<void> {
    this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  async updateTaskById(
    @Param('id') id: string,
    @Body('status') updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<ITask> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskById(id, status);
  }
}
*/
