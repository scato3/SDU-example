/**
 * Axios Instance with Interceptors
 *
 * CLAUDE.md 규칙:
 * - 서버 오류는 Error 상속 class로 변환해 throw
 * - AxiosError 그대로 노출 금지
 */

import axios, { AxiosError } from 'axios';
import {
  ApiError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  UnknownError,
} from '@/domains/ui/api/errors';

/**
 * Axios Instance
 */
export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Response Interceptor - 에러 처리
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Network Error
    if (!error.response) {
      throw new UnknownError('Network error occurred');
    }

    const { status, data } = error.response;
    const errorMessage =
      (data as { message?: string })?.message || `HTTP Error: ${status}`;

    // HTTP Status Code별 에러 변환
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
