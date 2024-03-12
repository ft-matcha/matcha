import { ApiContainers } from "@/provider/ApiContainerProvider";
import debounce from "@/utils/debounce";
import { deleteToken, setToken } from "@/utils/token";
import { useCallback, useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const useApi = () => {
	const api = useContext(ApiContainers);
	const [, , removeCookie] = useCookies(['refreshToken']);
	const navigator = useNavigate();

	const setAuthentic = (value: string) => {
		setToken('accessToken', value);
	}

	const removeAuthentic = () => {
		deleteToken('accessToken');
		removeCookie('refreshToken');
	}

	// const fetchApi = useCallback(
	// 	debounce(async (type: 'get' | 'post' | 'put', url: string, params?: Record<string, any>, auth?: boolean) => {
	// 		console.log(type, params, auth);
	// 		const response = (await api.call(
	// 			type,
	// 			url,
	// 			params,
	// 		));
	// 		if (auth) {
	// 			setAuthentic(response.data)
	// 			navigator('/explorer');
	// 			return;
	// 		}
	// 		return response;
	// 	}, 400),
	// 	[],
	// );
	const fetchApi = async (type: 'get' | 'post'| 'put' , url: string, params?: Record<string, any>, auth?: boolean) => {
		try {
			const response = api.call(type, url, params)
			if (auth) {
				setAuthentic(response.data);
				navigator('/explorer');
				return ;
			}
			return response;
		}
		catch (e) {
			const {response: {status}} = e as {response: {status?: number}};

			if (status && status === 401) {
				console.log('hihi')	
			} else {
				removeAuthentic();
				navigator('/');
			}
		}
	}
	return fetchApi;
}
export default useApi;