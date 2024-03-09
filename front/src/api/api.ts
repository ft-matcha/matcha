import type { Api } from '@/api/api-types';
import { responsePipe } from '@/api/apiWrapper';
import { getToken, setToken } from '@/utils/token';


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
				const {data, ...rest} = params;
				console.log(`data: `, data)
				console.log(`headers: `, rest);
				return this.getInstance().post(url, data, rest);
			case 'get':
				return this.getInstance().get(url, params);
			case 'put':
				return this.getInstance().put(url, params);
		}
	}

	fetchApi(type: string, params: any, url?: string) {
		if (url) {
			return this.callApi(type, url, params);
		}
		return this.callApi(type, this.baseUrl, params);
	}
}

// export class LoginApi extends ApiCall {
//   constructor(apiInstance: Api.ApiInstance, url: string) {
//     super(apiInstance, url);
//   }
// }

// export class RegisterApi extends ApiCall {
//   constructor(apiInstance: Api.ApiInstance, url: string) {
//     super(apiInstance, url);
//   }
// }

interface ApiContainerProps {
	apiInstance: Api.ApiInstance;
	apiInstanceObject: Record<string, Function>;
}

export class ApiContainer {
	[key: string]: ApiCall | Function | string | Record<string, ApiCall> | boolean;
	private apiContainer: Record<string, ApiCall> = {};

	constructor({ apiInstance, apiInstanceObject }: ApiContainerProps) {
		Object.entries(apiInstanceObject).forEach(([key, value]) => {
			if (typeof value === 'function') {
				const temp = (value as (apiInstance: Api.ApiInstance, url: string) => ApiCall)(
					apiInstance,
					`${process.env.REACT_APP_URL}${key.replace('Api', '')}`,
				);
				if (temp instanceof ApiCall) {
					(this.apiContainer as Record<string, ApiCall>)[key] = temp as ApiCall;
				}
			}
		});
	}

	setBearerTokenInHeader(type: 'get' | 'post' | 'put', dataParams: Record<string, any> | null) {
		const token = getToken('accessToken');
		const obj: Record<string, Record<string, string | null> | boolean | string> = {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				"Authorization": token && `bearer ${token}`,
			},
		};
		if (!dataParams) return obj;
		switch (type) {
			case 'get':
				obj.params = { ...dataParams };
				return obj;
			case 'post':
			case 'put':
				obj.data = { ...dataParams };
				return obj;
		}
	}

	run(method: string, target: string, dataParams: any, url?: string) {
		return (this.apiContainer[target + 'Api'] as ApiCall).fetchApi(method, dataParams, url);
	}

	async call(type: 'get' | 'post' | 'put', target: string, dataParams?: any, url?: string) {
		try {
			const result = this.run(type, target, this.setBearerTokenInHeader(type, dataParams), url);
			if (result instanceof Promise) {
				const response = await responsePipe(result as Promise<Api.BackendResponse>);
				return response;
			}
		} catch (e) {
			console.log(e);
			// if (target === 'login') {
			//   return { success: false, error: { message: 'Login failed' } };
			// }
		}
	}
}
