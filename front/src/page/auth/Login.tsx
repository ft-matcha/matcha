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
import useApi from '@/hooks/useApi';

export default function Login({onClick}: { onClick: (prev: boolean) => void; }) {
	const modal = React.useContext(ModalContext);
	const navigator = useNavigate();
	const api = useApi();


	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const obj = formHandler(e.currentTarget);
		const response =  await api('post', 'login', obj, true);	
		if (response) {
			navigator('/explorer');
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
					<Button onClick={onClick}>Sign Up</Button>
				)}
			</div>
		</Form>
	);
}
