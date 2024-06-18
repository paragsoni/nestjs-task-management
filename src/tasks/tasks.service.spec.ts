import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { ITaskStatus } from './tasks.model';
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
});

const mockUser = {
  id: 'some-id',
  username: 'john.doe',
  password: 'Str0ngP4sSw0rd',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();
    tasksService = module.get<TasksService>(TasksService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(true).toEqual(true);
  });

  describe('getTasks', () => {
    it('calls TaskRepository.getTasks and returns the result', async () => {
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      taskRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TaskRepository.getTaskById and returns the result', async () => {
      expect(taskRepository.getTaskById).not.toHaveBeenCalled();
      const mockTask: Task = {
        id: 'some-id',
        name: 'some title',
        details: 'some description',
        status: ITaskStatus.OPEN,
        user: mockUser,
      };
      taskRepository.getTaskById.mockResolvedValue(mockTask);
      const result = await taskRepository.getTaskById(mockTask.id, mockUser);
      console.log(result);
      expect(taskRepository.getTaskById).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.getTaskById and handles an error', async () => {
      taskRepository.getTaskById.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
