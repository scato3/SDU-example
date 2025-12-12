'use client';

/**
 * Screen View Component
 *
 * CLAUDE.md 규칙:
 * - Suspense + ErrorBoundary 환경에서 Query 적용
 * - UI 렌더링만 담당
 * - 비즈니스 로직 금지
 */

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/components/ErrorFallback';
import { useScreen } from '../hooks/useScreen';
import { ComponentRenderer } from './ComponentRenderer';
import styles from './ScreenView.module.scss';

type ScreenContentProps = {
  screenId: string;
};

/**
 * Screen Content (Suspense 내부)
 */
const ScreenContent = ({ screenId }: ScreenContentProps) => {
  const { screen } = useScreen(screenId);

  return (
    <div className={styles.screen}>
      <h1 className={styles.screenTitle}>{screen.title}</h1>
      <div className={styles.components}>
        {screen.components.map((component) => (
          <ComponentRenderer key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
};

/**
 * Loading Fallback
 */
const LoadingFallback = () => (
  <div className={styles.loading}>
    <div className={styles.spinner} />
    <p>Loading screen...</p>
  </div>
);

/**
 * Screen View with Suspense and ErrorBoundary
 */
export const ScreenView = ({ screenId }: ScreenContentProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <ScreenContent screenId={screenId} />
      </Suspense>
    </ErrorBoundary>
  );
};
