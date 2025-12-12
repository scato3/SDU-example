"use client";

/**
 * React Query Provider
 *
 * CLAUDE.md 규칙:
 * - QueryClient defaultOptions → throwOnError: true 설정
 * - Suspense 활성화는 useSuspenseQuery()로만 수행
 * - 로딩은 Suspense fallback, 에러는 ErrorBoundary fallback으로 처리
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            throwOnError: true,
          },
          mutations: {
            throwOnError: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
