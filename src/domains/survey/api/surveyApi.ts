/**
 * Survey API Layer
 */

import { apiClient } from '@/lib/axios';
import {
  SurveyScreenResponse,
  SurveySubmission,
} from '../types/survey.types';
import { SurveyScreenResponseSchema } from './schemas';

/**
 * Fetch Survey Data
 */
const fetchSurvey = async (
  surveyId: string
): Promise<SurveyScreenResponse> => {
  const { data } = await apiClient.get(`/surveys/${surveyId}`);
  return SurveyScreenResponseSchema.parse(data);
};

/**
 * Submit Survey Responses
 */
const submitSurvey = async (submission: SurveySubmission): Promise<void> => {
  await apiClient.post('/surveys/submit', submission);
};

/**
 * Survey API Interface
 */
export const surveyApi = {
  fetchSurvey,
  submitSurvey,
} as const;
