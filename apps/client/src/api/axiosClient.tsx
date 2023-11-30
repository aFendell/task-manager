import axios from 'axios';
import environment from '@/constants/config';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import createClient, { createAuthHeaderSetter } from './createClient';

const config: AxiosRequestConfig = { baseURL: environment.coreBaseURL };

const instance: AxiosInstance = axios.create(config);

const axiosClient = createClient(instance);

export const setHeaderToken = createAuthHeaderSetter(instance);

export default axiosClient;
