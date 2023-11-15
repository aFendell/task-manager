import { Task } from './response';

export type CreateTask = Pick<Task, 'title' | 'description'>;

export type UpdateTaskStatus = Pick<Task, 'status'>;
