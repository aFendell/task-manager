export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type TasksList = Task[];

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};

export type User = {
  id: string;
  username: string;
  password: string;
  tasks: Task[];
};

export type Token = Record<'accessToken', string>;
