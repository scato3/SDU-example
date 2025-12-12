/**
 * Error Classes for UI Domain
 *
 * CLAUDE.md 규칙:
 * - 모든 에러는 Error 상속 class
 * - API 레이어에서만 생성/throw
 * - ErrorBoundary에서 instanceof로 분기 처리 가능
 */

/**
 * Base API Error
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly __handled: boolean = false;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

/**
 * 401 Unauthorized Error
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

/**
 * 403 Forbidden Error
 */
export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

/**
 * 404 Not Found Error
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Not Found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Unknown/Unexpected Error
 */
export class UnknownError extends Error {
  constructor(message: string = 'An unknown error occurred') {
    super(message);
    this.name = 'UnknownError';
  }
}
