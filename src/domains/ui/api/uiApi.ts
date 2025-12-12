/**
 * UI Domain API Layer
 *
 * CLAUDE.md 규칙:
 * - Repository 네이밍 금지, <domain>Api.* 형태 사용
 * - 서버 통신만 담당, zod 검증 수행
 * - 서버 오류는 Error 상속 class로 변환해 throw
 */

import { UIScreenResponse } from '../types/component.types';
import { apiClient } from '@/lib/axios';
import { UIScreenResponseSchema } from './schemas';

/**
 * Fetch Screen Data from API
 *
 * - axios 인터셉터가 HTTP 에러를 Custom Error로 변환
 * - zod가 응답 데이터 검증 (실패 시 ZodError throw)
 * - 모든 에러는 자연스럽게 상위로 전파
 */
const fetchScreen = async (screenId: string): Promise<UIScreenResponse> => {
  const { data } = await apiClient.get(`/screens/${screenId}`);
  return UIScreenResponseSchema.parse(data);
};

/**
 * UI API Interface
 */
export const uiApi = {
  fetchScreen,
} as const;
