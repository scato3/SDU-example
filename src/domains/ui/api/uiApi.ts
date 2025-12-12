import { UIScreenResponse } from '../types/component.types';
import { apiClient } from '@/lib/axios';
import { UIScreenResponseSchema } from './schemas';

const fetchScreen = async (screenId: string): Promise<UIScreenResponse> => {
  const { data } = await apiClient.get(`/screens/${screenId}`);
  return UIScreenResponseSchema.parse(data);
};

export const uiApi = {
  fetchScreen,
} as const;
