export interface ITask {
  id: string;
  name: string;
  details: string;
  status: ITaskStatus;
}

export enum ITaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ICreateTask {
  name: string;
  details: string;
}
