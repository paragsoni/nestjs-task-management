import { IsNotEmpty } from 'class-validator';

IsNotEmpty;
export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  details: string;
}
