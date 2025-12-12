/**
 * Survey API Schemas
 */

import { z } from 'zod';
import { UIComponentSchema } from '@/domains/ui/api/schemas';

/**
 * Survey Step Schema
 */
export const SurveyStepSchema = z.object({
  stepId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  component: UIComponentSchema,
});

/**
 * Survey Screen Response Schema
 */
export const SurveyScreenResponseSchema = z.object({
  surveyId: z.string(),
  title: z.string(),
  steps: z.array(SurveyStepSchema),
});

/**
 * Step Response Schema
 */
export const StepResponseSchema = z.object({
  stepId: z.string(),
  componentId: z.string(),
  componentType: z.string(),
  value: z.unknown(),
});

/**
 * Survey Submission Schema
 */
export const SurveySubmissionSchema = z.object({
  surveyId: z.string(),
  responses: z.array(StepResponseSchema),
  completedAt: z.string(),
});
