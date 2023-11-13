import { TaskStatus } from './types';

export type TasksList = Task[];

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};
