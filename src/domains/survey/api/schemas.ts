import { z } from 'zod';
import { UIComponentSchema } from '@/domains/ui/api/schemas';

export const SurveyStepSchema = z.object({
  stepId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  component: UIComponentSchema,
});

export const SurveyScreenResponseSchema = z.object({
  surveyId: z.string(),
  title: z.string(),
  steps: z.array(SurveyStepSchema),
});

export const StepResponseSchema = z.object({
  stepId: z.string(),
  componentId: z.string(),
  componentType: z.string(),
  value: z.unknown(),
});

export const SurveySubmissionSchema = z.object({
  surveyId: z.string(),
  responses: z.array(StepResponseSchema),
  completedAt: z.string(),
});
