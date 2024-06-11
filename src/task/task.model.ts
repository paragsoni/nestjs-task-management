export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}
export interface Task {
    id: string;
    name: string;
    description: string;
    status: TaskStatus;
}