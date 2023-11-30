import axiosClient from './axiosClient';
import * as Params from './params';
import * as Response from './response';
import * as Payload from './payload';
import { HTTPMethod } from './types';

const tasksBaseUrl = '/tasks';
const authBaseUrl = '/auth';

export const AuthAPI = {
  signUp: async (data: Payload.UserPayload) => {
    await axiosClient<void>({
      url: `${authBaseUrl}/signup`,
      method: HTTPMethod.POST,
      data,
    });
  },

  login: async (data: Payload.UserPayload) => {
    const token = await axiosClient<Response.Token>({
      url: `${authBaseUrl}/login`,
      method: HTTPMethod.POST,
      data,
    });

    return token;
  },
};

export const TasksAPI = {
  getTasks: async (params?: Params.TasksFilter) => {
    const tasks = await axiosClient<Response.TasksList>({
      url: tasksBaseUrl,
      method: HTTPMethod.GET,
      params,
    });

    return tasks;
  },

  createTask: async (data: Payload.CreateTask) => {
    const task = await axiosClient<Response.Task>({
      url: tasksBaseUrl,
      method: HTTPMethod.POST,
      data,
    });

    return task;
  },

  getTaskById: async (id: string) => {
    const task = await axiosClient<Response.Task>({
      url: `${tasksBaseUrl}/${id}`,
      method: HTTPMethod.GET,
    });

    return task;
  },

  deleteTask: async (id: string) => {
    await axiosClient<void>({
      url: `${tasksBaseUrl}/${id}`,
      method: HTTPMethod.DELETE,
    });
  },

  updateTaskStatus: async (id: string, data: Payload.UpdateTaskStatus) => {
    const task = await axiosClient<Response.Task>({
      url: `${tasksBaseUrl}/${id}/status`,
      method: HTTPMethod.PATCH,
      data,
    });

    return task;
  },
};
