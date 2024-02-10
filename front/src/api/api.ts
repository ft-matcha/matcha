import type { Api } from '@/api/api-types';
import { responsePipe } from '@/api/apiWrapper';

export class ApiCall {
  private readonly apiInstance: Api.ApiInstance;
  constructor(apiInstance: Api.ApiInstance) {
    this.apiInstance = apiInstance;
  }

  getInstance() {
    return this.apiInstance;
  }

  callApi(type: any, url: string, params: any) {
    switch (type) {
      case 'post':
        return this.getInstance().post(url, params);
      case 'get':
        return this.getInstance().get(url, params);
    }
  }

  fetchApi(type: any, params: any, url?: string): any {
    throw new Error('if you want to use fetchApi implements this method');
  }
}

export class LoginApi extends ApiCall {
  private readonly baseUrl: string;
  constructor(apiInstance: Api.ApiInstance, url: string) {
    super(apiInstance);
    this.baseUrl = url;
  }

  fetchApi(type: string, params: { id: string; password: string }, url?: string) {
    if (url) {
      return this.callApi(type, url, params);
    }
    return this.callApi(type, this.baseUrl, params);
  }
}

export class ApiContainer {
  [key: string]: ApiCall | Function | string | Record<string, ApiCall>;
  private userToken = '';
  private apiContainer: Record<string, ApiCall> = {};
  constructor(apiInstance: Api.ApiInstance, api: Record<string, Function>) {
    // this.loginApi = new LoginApi(apiInstance, 'https://localhost:3000');
    Object.entries(api).forEach(([key, value]) => {
      if (typeof value === 'function') {
        const temp = (value as (apiInstance: Api.ApiInstance, url: string) => ApiCall)(
          apiInstance,
          'https://randomuser.me/api',
        );
        if (temp instanceof ApiCall) {
          this[key] = temp;
          (this.apiContainer as Record<string, ApiCall>)[key] = temp as ApiCall;
        }
      }
    });
  }

  run(target: string, dataParams: any, method: string, url?: string) {
    if (url) {
      return (this.apiContainer[target + 'Api'] as ApiCall).fetchApi(method, dataParams, url);
    } else {
      return (this.apiContainer[target + 'Api'] as ApiCall).fetchApi(method, dataParams);
    }
  }

  async call(target: string, dataParams: any) {
    const result = this.run(target, dataParams, 'get');
    if (result instanceof Promise) {
      const response = await responsePipe(result as Promise<Api.BackendResponse>);
      if (target + 'Api' === 'loginApi' && response.token) {
        console.log(response);
        this.userToken = response.token;
      }
      return response;
    }
  }
}
