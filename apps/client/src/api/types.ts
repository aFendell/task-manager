import { AxiosRequestConfig } from 'axios';

export enum HTTPMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  OPTIONS = 'options',
  HEAD = 'head',
}

export enum StatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export type APIErrorConfig = {
  originalRequest: AxiosRequestConfig<unknown>;
  status: StatusCode;
  message: string;
  validationErrors?: Record<string, string[]> | null;
};

export class APIError extends Error {
  originalRequest: AxiosRequestConfig<unknown>;

  status: StatusCode;

  validationErrors: Record<string, string[]> | null;

  constructor(config: APIErrorConfig) {
    super();
    this.originalRequest = config.originalRequest;
    this.status = config.status;
    this.message = config.message;
    this.validationErrors = config.validationErrors || null;
  }
}
