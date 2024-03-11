import { ApiContainers } from "@/provider/ApiContainerProvider";
import { deleteToken, setToken } from "@/utils/token";
import { useContext } from "react";
import { useCookies } from "react-cookie";


const useApi = () => {
	const api = useContext(ApiContainers);
	const [,, removeCookie] = useCookies(['refreshToken']);

	const setAuthentic = (value: string) => {
		setToken('accessToken', value);
	}

	const removeAuthentic = () => {
		deleteToken('accessToken');
		removeCookie('refreshToken');
	}
	
	const fetchApi = async (type: 'get' | 'post' |'put', url : string, params?: Record<string, any>, auth?: boolean) => {
		try {
			const response = api.call(type, url, params);
			console.log(response);
			if (auth) 	
				setAuthentic(response.data)
			return response.data;
		}
		catch (e) {
			if (auth) {
				removeAuthentic();
			} 
			return null;
		}
	}
	return fetchApi;
}
export default useApi;