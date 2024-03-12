import type { Api } from '@/api/api-types';

export function responsePipe(response: Promise<Api.BackendResponse>) : any{
  return response
	.then((res) => res.data);
}