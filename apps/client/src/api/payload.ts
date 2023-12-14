import { Task, User } from './response';

export type CreateTask = Pick<Task, 'title' | 'description'>;

export type UpdateTaskStatus = Pick<Task, 'status'>;

export type UserPayload = Pick<User, 'username' | 'password'>;
