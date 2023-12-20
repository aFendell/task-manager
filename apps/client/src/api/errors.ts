import type { AxiosError } from 'axios';
import { APIError, StatusCode } from './types';

const errors: Record<StatusCode, string> = {
  [StatusCode.SERVICE_UNAVAILABLE]:
    'This service is unavailable right now, please try again later',
  [StatusCode.INTERNAL_SERVER_ERROR]:
    'An unexpected error occurred, please try again later',
  [StatusCode.NOT_FOUND]:
    'The requested content does not exist, please try something else',
  [StatusCode.FORBIDDEN]: 'You are not allowed to access this content',
  [StatusCode.UNAUTHORIZED]: 'Please check your credentials.',
};

export function handleErrorResponse(
  err: AxiosError<Record<string, string | string[] | undefined>>,
) {
  const originalRequest = err.config ?? {};
  const status: StatusCode =
    err.response?.status || StatusCode.INTERNAL_SERVER_ERROR;
  if (!err.response) {
    const error = new APIError({
      originalRequest,
      status,
      message: errors[StatusCode.SERVICE_UNAVAILABLE],
    });
    throw error;
  }
  if (status in errors) {
    const error = new APIError({
      originalRequest,
      status,
      message: errors[status],
    });

    throw error;
  }

  const validationErrors: Record<string, string[]> =
    (err?.response?.data as Record<string, string[]>) ?? null;

  let message =
    err?.response?.data?.message ??
    (err.message || errors[StatusCode.INTERNAL_SERVER_ERROR]);

  message = Array.isArray(message) ? message[0] : message;

  const error = new APIError({
    originalRequest,
    message,
    status,
    validationErrors: message in validationErrors ? null : validationErrors,
  });
  throw error;
}

export default errors;
