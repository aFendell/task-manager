import axiosClient from './axiosClient';
import * as Params from './params';
import * as Response from './response';
import * as Payload from './payload';
import { HTTPMethod } from './types';

const tasksBaseUrl = '/tasks';

export const TasksAPI = {
  getTasks: async (params?: Params.TasksFilter) => {
    const { data } = await axiosClient<Response.TasksList>({
      url: tasksBaseUrl,
      method: HTTPMethod.GET,
      params,
    });

    return data;
  },

  createTask: async (data: Payload.CreateTask) => {
    const { data: task } = await axiosClient<Response.Task>({
      url: tasksBaseUrl,
      method: HTTPMethod.POST,
      data,
    });

    return task;
  },

  getTaskById: async (id: string) => {
    const { data: task } = await axiosClient<Response.Task>({
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
    const { data: task } = await axiosClient<Response.Task>({
      url: `${tasksBaseUrl}/${id}/status`,
      method: HTTPMethod.PATCH,
      data,
    });

    return task;
  },
};
