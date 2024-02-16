import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import InputContainer from '@/components/InputContainer';
import { userInfo } from '@/data/AuthData';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalContext } from '@/provider/ModalProvider';
import { useCookies } from 'react-cookie';
import { deleteToken, getToken, setToken } from '@/utils/token';

export default function Login() {
  const api = React.useContext(ApiContainers);
  const modal = React.useContext(ModalContext);
  const [_, setCookie, removeCookie] = useCookies(['refreshToken']);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const obj: Record<string, FormDataEntryValue> = {};
    for (let [key, value] of data.entries()) {
      obj[key] = value;
    }
    const result = await api.call('get', 'login', obj, 'https://randomuser.me/api');
    if (result?.success) {
      setCookie('refreshToken', result.refreshToken, { path: '/' });
      setToken('accessToken', result.data.accessToken);
      getToken('accessToken');
    } else {
      removeCookie('refreshToken');
      deleteToken('accessToken');
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <div>
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
