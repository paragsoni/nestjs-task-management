import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ITaskStatus } from 'src/tasks/tasks.model';
export class SearchTaskDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ITaskStatus)
  status?: ITaskStatus;
}
