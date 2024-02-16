import type { Api } from '@/api/api-types';

export async function responsePipe(response: Promise<Api.BackendResponse>) {
  return await response
    .then((res) => ({ data: res.data, code: res.ok }))
    .then((data) => {
      return { ...data.data };
    })
    .catch((err) => {
      throw new Error(err);
    });
}
