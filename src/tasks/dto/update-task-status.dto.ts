import { IsEnum } from 'class-validator';
import { ITaskStatus } from '../tasks.model';

export class UpdateTaskStatusDto {
  @IsEnum(ITaskStatus)
  status: ITaskStatus;
}
