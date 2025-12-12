'use client';

import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorFallback } from '@/components/ErrorFallback';
import { surveyQueries } from '../query/surveyQueries';
import { useSurveyState } from '../hooks/useSurveyState';
import { StepNavigation } from './StepNavigation';
import { InteractiveStep } from './InteractiveStep';
import styles from './SurveyScreen.module.scss';

type SurveyContentProps = {
  surveyId: string;
};

const SurveyContent = ({ surveyId }: SurveyContentProps) => {
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);

  const { data: survey } = useSuspenseQuery(surveyQueries.survey.detail(surveyId));
  const {
    currentStep,
    saveResponse,
    goToNext,
    goToPrevious,
    submit,
    isSubmitting,
    isSubmitted,
    isFirstStep,
    isLastStep,
  } = useSurveyState(surveyId, survey.steps.length);

  const currentStepData = survey.steps[currentStep];

  if (isSubmitted) {
    return (
      <div className={styles.success}>
        <h1>✅ Survey Submitted!</h1>
        <p>Thank you for completing the survey.</p>
      </div>
    );
  }

  return (
    <div className={styles.survey}>
      <div className={styles.header}>
        <h1 className={styles.title}>{survey.title}</h1>
      </div>

      <div className={styles.step}>
        <h2 className={styles.stepTitle}>{currentStepData.title}</h2>
        {currentStepData.description && (
          <p className={styles.stepDescription}>
            {currentStepData.description}
          </p>
        )}

        <div className={styles.component}>
          <InteractiveStep
            stepId={currentStepData.stepId}
            component={currentStepData.component}
            onResponse={saveResponse}
            onValidationChange={setIsCurrentStepValid}
          />
        </div>
      </div>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={survey.steps.length}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onSubmit={submit}
        isSubmitting={isSubmitting}
        canProceed={isCurrentStepValid}
      />
    </div>
  );
};

const LoadingFallback = () => (
  <div className={styles.loading}>
    <div className={styles.spinner} />
    <p>Loading survey...</p>
  </div>
);

export const SurveyScreen = ({ surveyId }: SurveyContentProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <SurveyContent surveyId={surveyId} />
      </Suspense>
    </ErrorBoundary>
  );
};
