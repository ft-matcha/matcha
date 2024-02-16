import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import InputContainer from '@/components/InputContainer';
import { userRegister } from '@/data/AuthData';
import { ModalContext } from '@/provider/ModalProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import { useCookies } from 'react-cookie';
import { deleteToken, getToken, setToken } from '@/utils/token';

const Register = () => {
  const { modalProp, setModal } = useContext(ModalContext);
  const api = useContext(ApiContainers);
  const [_, setCookie] = useCookies(['refreshToken']);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const obj: Record<string, FormDataEntryValue> = {};
    for (let [key, value] of data.entries()) {
      obj[key] = value;
    }
    const result = await api.call('get', 'register', obj, 'https://randomuser.me/api');
    if (result?.success) {
      setCookie('refreshToken', result.refreshToken, { path: '/' });
      setToken('accessToken', result.data.accessToken);
      getToken('accessToken');
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <h1>Sign up</h1>
        <p>Sgin your account!</p>
      </div>
      {userRegister.map((item) => (
        <InputContainer {...item} />
      ))}
      <Button type="submit">Sign up</Button>
      <h2>
        Do you have an account?
        {modalProp.modalType === 'signUpModal' ? (
          <Button onClick={() => setModal({ modalType: 'loginModal', toggle: true })}>
            Sign In
          </Button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </h2>
    </Form>
  );
};

export default Register;
