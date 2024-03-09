import Button from '@/components/ui/Button';
import Form, { formHandler } from '@/components/ui/Form';
import InputContainer from '@/components/InputContainer';
import { userInfo } from '@/data/AuthData';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ModalContext } from '@/provider/ModalProvider';
import { useCookies } from 'react-cookie';
import { deleteToken, getToken, setToken } from '@/utils/token';

export default function Login() {
  const api = React.useContext(ApiContainers);
  const modal = React.useContext(ModalContext);
  const [_, setCookie, removeCookie] = useCookies(['refreshToken']);
  const navigator = useNavigate();

  useEffect(() => {
	const token = getToken('accessToken');
	console.log(token) 
	if (token) {
		navigator("/explorer");
	}

  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = formHandler(e.currentTarget);
    const result = await api.call('post', 'login', obj);
    if (result?.success) {
      setToken('accessToken', result.data.accessToken);
      getToken('accessToken');
    } else {
      removeCookie('refreshToken');
      deleteToken('accessToken');
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <div id="header">
        <h1>Login</h1>
        <p>Enter your email below to login to your account</p>
      </div>
      <div>
        {userInfo.map((item, i) => (
          <InputContainer notFocus={i !== 0} {...item} key={`user_${item.id}`} />
        ))}
        <Button type="submit">Sign In</Button>
        {modal.modalProp.modalType === 'loginModal' ? (
          <Button onClick={() => modal.setModal({ modalType: 'signUpModal', toggle: true })}>
            Sign Up
          </Button>
        ) : (
          <Link to="/register">Sign Up</Link>
        )}
      </div>
    </Form>
  );
}
