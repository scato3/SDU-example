/**
 * Survey/Form Types
 */

import { UIComponent } from '@/domains/ui/types/component.types';

/**
 * Survey Step
 */
export interface SurveyStep {
  stepId: string;
  title: string;
  description?: string;
  component: UIComponent;
}

/**
 * Survey Screen (multi-step)
 */
export interface SurveyScreenResponse {
  surveyId: string;
  title: string;
  steps: SurveyStep[];
}

/**
 * User Response per Step
 */
export interface StepResponse {
  stepId: string;
  componentId: string;
  componentType: string;
  value: unknown;
}

/**
 * Survey Submission Data
 */
export interface SurveySubmission {
  surveyId: string;
  responses: StepResponse[];
  completedAt: string;
}
