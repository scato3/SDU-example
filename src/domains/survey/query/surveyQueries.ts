import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { surveyApi } from '../api/surveyApi';

export const surveyQueries = createQueryKeyStore({
  survey: {
    detail: (surveyId: string) => ({
      queryKey: [surveyId],
      queryFn: () => surveyApi.fetchSurvey(surveyId),
    }),
  },
});
