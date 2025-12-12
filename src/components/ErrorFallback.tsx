/**
 * Error Fallback Component
 *
 * CLAUDE.md 규칙:
 * - instanceof 분기로 에러 타입별 처리
 * - UI 렌더링만 수행, 비즈니스 로직 금지
 */

import { FallbackProps } from 'react-error-boundary';
import {
  UnauthorizedError,
  ForbiddenError,
  ApiError,
  UnknownError,
} from '@/domains/ui/api/errors';
import styles from './ErrorFallback.module.scss';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  // Unauthorized Error
  if (error instanceof UnauthorizedError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1 className={styles.errorTitle}>🔒 Unauthorized</h1>
          <p className={styles.errorMessage}>{error.message}</p>
          <p className={styles.errorDescription}>
            You need to log in to access this content.
          </p>
          <button className={styles.errorButton} onClick={resetErrorBoundary}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Forbidden Error
  if (error instanceof ForbiddenError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1 className={styles.errorTitle}>🚫 Forbidden</h1>
          <p className={styles.errorMessage}>{error.message}</p>
          <p className={styles.errorDescription}>
            You don't have permission to access this resource.
          </p>
          <button className={styles.errorButton} onClick={resetErrorBoundary}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // API Error
  if (error instanceof ApiError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1 className={styles.errorTitle}>⚠️ API Error</h1>
          <p className={styles.errorMessage}>{error.message}</p>
          <p className={styles.errorDescription}>
            Status Code: {error.statusCode}
          </p>
          <button className={styles.errorButton} onClick={resetErrorBoundary}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Unknown Error
  if (error instanceof UnknownError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1 className={styles.errorTitle}>❌ Unknown Error</h1>
          <p className={styles.errorMessage}>{error.message}</p>
          <button className={styles.errorButton} onClick={resetErrorBoundary}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Default Error (including ZodError, etc.)
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>💥 Something went wrong</h1>
        <p className={styles.errorMessage}>
          {error.message || 'An unexpected error occurred'}
        </p>
        <button className={styles.errorButton} onClick={resetErrorBoundary}>
          Try Again
        </button>
      </div>
    </div>
  );
};
