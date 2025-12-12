import styles from './StepNavigation.module.scss';

type StepNavigationProps = {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  canProceed?: boolean;
};

export const StepNavigation = ({
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
  canProceed = true,
}: StepNavigationProps) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.progress}>
        <div className={styles.progressText}>
          Step {currentStep + 1} of {totalSteps}
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.buttons}>
        {!isFirstStep && (
          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={onPrevious}
            disabled={isSubmitting}
          >
            Previous
          </button>
        )}

        {!isLastStep ? (
          <button
            type="button"
            className={styles.buttonPrimary}
            onClick={onNext}
            disabled={!canProceed || isSubmitting}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className={styles.buttonPrimary}
            onClick={onSubmit}
            disabled={!canProceed || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
          </button>
        )}
      </div>
    </div>
  );
};
