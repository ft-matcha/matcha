import { ApiContainers } from '@/provider/ApiContainerProvider';
import { deleteToken, setToken } from '@/utils/token';
import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
        toast('login success');
        return;
      }
      toast('api success');
      return response;
    } catch (e) {
      // removeAuthentic();
      // navigator('/');
      // toast('api fail');
    }
  };
  return fetchApi;
};
export default useApi;
