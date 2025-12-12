/**
 * Screen Hook
 *
 * CLAUDE.md 규칙:
 * - Hooks는 상태 + 서비스/쿼리 호출만 담당
 * - 데이터 가공/도메인 로직 금지
 * - useSuspenseQuery로 Suspense 활성화
 */

import { useSuspenseQuery } from '@tanstack/react-query';
import { uiQueries } from '../query/uiQueries';

export const useScreen = (screenId: string) => {
  const query = useSuspenseQuery(uiQueries.ui.screen(screenId));

  return {
    screen: query.data,
  };
};
