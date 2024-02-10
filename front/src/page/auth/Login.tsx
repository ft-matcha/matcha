import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import InputContainer from '@/components/InputContainer';
import { userInfo } from '@/data/AuthData';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalContext } from '@/provider/ModalProvider';

export default function Login() {
  const api = React.useContext(ApiContainers);
  const modal = React.useContext(ModalContext);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const obj: Record<string, FormDataEntryValue> = {};
        for (let [key, value] of data.entries()) {
          obj[key] = value;
        }
        console.log(api.call('login', obj));
      }}
    >
      <div>
        <h1>Login</h1>
        <p>Enter your email below to login to your account</p>
      </div>
      <div>
        {userInfo.map((item) => (
          <InputContainer {...item} key={`user_${item.id}`} />
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
