import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ITaskStatus } from '../tasks.model';
export class SearchTaskDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ITaskStatus)
  status?: ITaskStatus;
}
