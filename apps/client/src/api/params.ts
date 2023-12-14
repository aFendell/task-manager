import { TaskStatus } from './response';

export type TasksFilter = {
  status?: TaskStatus;
  search?: string;
};
