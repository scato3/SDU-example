import axios, { AxiosError } from 'axios';
import {
  ApiError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  UnknownError,
} from '@/domains/ui/api/errors';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      throw new UnknownError('Network error occurred');
    }

    const { status, data } = error.response;
    const errorMessage =
      (data as { message?: string })?.message || `HTTP Error: ${status}`;

    switch (status) {
      case 401:
        throw new UnauthorizedError(errorMessage);
      case 403:
        throw new ForbiddenError(errorMessage);
      case 404:
        throw new NotFoundError(errorMessage);
      default:
        throw new ApiError(errorMessage, status);
    }
  }
);
