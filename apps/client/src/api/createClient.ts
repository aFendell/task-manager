/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { handleErrorResponse } from './errors';
import { paramsSerializer, setAuthHeaderFromStorage } from './utils';
import StorageKey from '@/constants/storage';
import { HTTPMethod } from './types';

const createClient = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    setAuthHeaderFromStorage(StorageKey.TOKEN) as (
      value: InternalAxiosRequestConfig<any>,
    ) => InternalAxiosRequestConfig<any>,
  );
  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    handleErrorResponse,
  );

  return <T>({
    method = HTTPMethod.GET,
    url,
    data,
    ...rest
  }: AxiosRequestConfig): Promise<T> =>
    instance({
      method,
      url,
      data,
      paramsSerializer: { serialize: paramsSerializer },
      ...rest,
    }).then((res: AxiosResponse<T>) => res.data);
};

export const createAuthHeaderSetter =
  (instance: AxiosInstance) => (token?: string) => {
    if (token)
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete instance.defaults.headers.common.Authorization;
    return token;
  };

export default createClient;
