import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { uiApi } from '../api/uiApi';

export const uiQueries = createQueryKeyStore({
  ui: {
    screen: (screenId: string) => ({
      queryKey: [screenId],
      queryFn: () => uiApi.fetchScreen(screenId),
    }),
  },
});
