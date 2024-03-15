import { ApiContainers } from "@/provider/ApiContainerProvider";
import debounce from "@/utils/debounce";
import { deleteToken, setToken } from "@/utils/token";
import { useCallback, useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useApi = () => {
  const api = useContext(ApiContainers);
  const [, , removeCookie] = useCookies(['refreshToken']);
  const navigator = useNavigate();

  const setAuthentic = ({ accessToken }: { accessToken: string }) => {
    setToken('accessToken', accessToken);
  };

  const removeAuthentic = () => {
    deleteToken('accessToken');
    removeCookie('refreshToken');
  };

  const fetchApi = async (
    type: 'get' | 'post' | 'put',
    url: string,
    params?: Record<string, any>,
    auth?: boolean,
  ) => {
    try {
      const response = await api.call(type, url, params);
      if (auth) {
        setAuthentic(response.data);
        navigator('/explorer');
        return;
      }
      toast('success');
      return response;
    } catch (e) {
      const {
        response: { status },
      } = e as { response: { status?: number } };
      removeAuthentic();
      navigator('/');
      toast('failed');
    }
  };
  return fetchApi;
};
export default useApi;