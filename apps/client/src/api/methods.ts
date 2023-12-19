import axiosClient from './axiosClient';
import * as Params from './params';
import * as Response from './response';
import * as Payload from './payload';
import { HTTPMethod } from './types';

const tasksUrl = '/tasks';
const authUrl = '/auth';

export const AuthAPI = {
  signUp: async (data: Payload.UserPayload) => {
    await axiosClient<void>({
      url: `${authUrl}/signup`,
      method: HTTPMethod.POST,
      data,
    });
  },

  login: async (data: Payload.UserPayload) => {
    const token = await axiosClient<Response.Auth>({
      url: `${authUrl}/login`,
      method: HTTPMethod.POST,
      data,
    });

    return token;
  },

  refreshTokens: () =>
    axiosClient<Response.Auth>({
      url: `${authUrl}/refresh-tokens`,
      method: HTTPMethod.GET,
    }),
};

export const TasksAPI = {
  getTasks: async (params?: Params.TasksFilter) => {
    const tasks = await axiosClient<Response.TasksList>({
      url: tasksUrl,
      method: HTTPMethod.GET,
      params,
    });

    return tasks;
  },

  createTask: async (data: Payload.CreateTask) => {
    const task = await axiosClient<Response.Task>({
      url: tasksUrl,
      method: HTTPMethod.POST,
      data,
    });

    return task;
  },

  getTaskById: async (id: string) => {
    const task = await axiosClient<Response.Task>({
      url: `${tasksUrl}/${id}`,
      method: HTTPMethod.GET,
    });

    return task;
  },

  deleteTask: async (id: string) => {
    await axiosClient<void>({
      url: `${tasksUrl}/${id}`,
      method: HTTPMethod.DELETE,
    });
  },

  updateTaskStatus: async (id: string, data: Payload.UpdateTaskStatus) => {
    const task = await axiosClient<Response.Task>({
      url: `${tasksUrl}/${id}/status`,
      method: HTTPMethod.PATCH,
      data,
    });

    return task;
  },
};
