/**
 * Survey Query Layer
 */

import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { surveyApi } from '../api/surveyApi';

/**
 * Query Key Factory
 */
export const surveyQueries = createQueryKeyStore({
  survey: {
    detail: (surveyId: string) => ({
      queryKey: [surveyId],
      queryFn: () => surveyApi.fetchSurvey(surveyId),
    }),
  },
});
