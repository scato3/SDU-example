import { apiClient } from '@/lib/axios';
import {
  SurveyScreenResponse,
  SurveySubmission,
} from '../types/survey.types';
import { SurveyScreenResponseSchema } from './schemas';

const fetchSurvey = async (
  surveyId: string
): Promise<SurveyScreenResponse> => {
  const { data } = await apiClient.get(`/surveys/${surveyId}`);
  return SurveyScreenResponseSchema.parse(data);
};

const submitSurvey = async (submission: SurveySubmission): Promise<void> => {
  await apiClient.post('/surveys/submit', submission);
};

export const surveyApi = {
  fetchSurvey,
  submitSurvey,
} as const;
