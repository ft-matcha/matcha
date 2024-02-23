import { ApiContainer } from '@/api/api';

export const uniqueEmail = async (api: ApiContainer, email: string) => {
  const result = await api.call('get', 'register', { email });
  return result;
};
