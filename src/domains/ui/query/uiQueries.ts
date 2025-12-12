/**
 * UI Domain Query Layer
 *
 * CLAUDE.md 규칙:
 * - lukemorales queryKeyFactory 사용
 * - 옵션은 필요한 Query에서만 직접 작성
 * - 동일 옵션 반복 시에만 queryOptionsFactory로 추출
 */

import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { uiApi } from '../api/uiApi';

/**
 * Query Key Factory
 */
export const uiQueries = createQueryKeyStore({
  ui: {
    screen: (screenId: string) => ({
      queryKey: [screenId],
      queryFn: () => uiApi.fetchScreen(screenId),
    }),
  },
});
