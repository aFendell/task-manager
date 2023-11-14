import axiosClient from './axiosClient';
import * as Params from './params';
import * as Response from './response';
import { HTTPMethod } from './types';

export const TasksAPI = {
  getTasks: async (params?: Params.TasksFilter) => {
    const { data } = await axiosClient<Response.TasksList>({
      url: '/tasks',
      method: HTTPMethod.GET,
      params,
    });

    return data;
  },
};
