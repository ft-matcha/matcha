import { ApiContainers } from "@/provider/ApiContainerProvider";
import { deleteToken, setToken } from "@/utils/token";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const useApi = () => {
	const api = useContext(ApiContainers);
	const [,, removeCookie] = useCookies(['refreshToken']);
	const navigator = useNavigate();

	const setAuthentic = (value: string) => {
		setToken('accessToken', value);
	}

	const removeAuthentic = () => {
		deleteToken('accessToken');
		removeCookie('refreshToken');
	}
	
	const fetchApi = async (type: 'get' | 'post' |'put', url : string, params?: Record<string, any>, auth?: boolean) => {
		try {
			const response = await api.call(type, url, params);
			if (response.error) {
				throw new Error();
			}
			if (auth) 	
				setAuthentic(response.data)
			return response;
		}

		catch (e) {
			// const {response: {status}} = e as {response: {status?: number}};
			
			// if (status && status === 401) {
			// 	console.log('hihi')	
			// } else {
			// 	removeAuthentic();
			// 	navigator('/');
			// }
		}
	}
	return fetchApi;
}
export default useApi;