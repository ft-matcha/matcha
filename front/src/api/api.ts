import type { Api } from '@/api/api-types';
import { responsePipe } from '@/api/apiWrapper';

export class ApiCall {
  private readonly apiInstance: Api.ApiInstance;
  protected readonly baseUrl: string;

  constructor(apiInstance: Api.ApiInstance, url: string) {
    this.apiInstance = apiInstance;
    this.baseUrl = url;
  }

  getInstance() {
    return this.apiInstance;
  }

  callApi(type: string, url: string, params: any) {
    switch (type) {
      case 'post':
        return this.getInstance().post(url, params);
      case 'get':
        return this.getInstance().get(url, params);
    }
  }

  fetchApi(type: string, params: any, url?: string) {
    if (url) {
      return this.callApi(type, url, params);
    }
    return this.callApi(type, this.baseUrl, params);
  }
}

export class LoginApi extends ApiCall {
  constructor(apiInstance: Api.ApiInstance, url: string) {
    super(apiInstance, url);
  }
}

export class RegisterApi extends ApiCall {
  constructor(apiInstance: Api.ApiInstance, url: string) {
    super(apiInstance, url);
  }
}

export class ApiContainer {
  [key: string]: ApiCall | Function | string | Record<string, ApiCall>;
  private userToken = '';
  private apiContainer: Record<string, ApiCall> = {};

  constructor(apiInstance: Api.ApiInstance, api: Record<string, Function>) {
    Object.entries(api).forEach(([key, value]) => {
      if (typeof value === 'function') {
        const temp = (value as (apiInstance: Api.ApiInstance, url: string) => ApiCall)(
          apiInstance,
          `http://localhost:3000/api/v0/${key.replace('Api', '')}`,
        );
        if (temp instanceof ApiCall) {
          this[key] = temp;
          (this.apiContainer as Record<string, ApiCall>)[key] = temp as ApiCall;
        }
      }
    });
  }

  setBearerTokenInHeader(dataParams: Record<string, any>) {
    return {
      headers: {
        Authorization: `bearer ${this.userToken}`,
      },
      body: {
        ...dataParams,
      },
    };
  }

  run(method: string, target: string, dataParams: any, url?: string) {
    return (this.apiContainer[target + 'Api'] as ApiCall).fetchApi(method, dataParams, url);
  }

  setToken(token: string) {
    this.userToken = token;
  }

  async call(type: string, target: string, dataParams: any, url?: string) {
    const result = this.run(type, target, this.setBearerTokenInHeader(dataParams), url);
    if (result instanceof Promise) {
      const response = await responsePipe(result as Promise<Api.BackendResponse>);
      if (target === 'login' && response.token) {
        this.setToken(response.token);
      }
      return response;
    }
  }
}
