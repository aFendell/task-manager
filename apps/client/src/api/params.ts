import { TaskStatus } from './types';

export type TasksFilter = {
  status: TaskStatus;
  search: string;
};
