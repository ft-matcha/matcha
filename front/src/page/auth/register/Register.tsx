import useFunnel from '@/hooks/useFunnel';
import Select from '@/components/ui/Select';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Form,  NavigateFunction, useNavigate } from 'react-router-dom';
import {  getToken, setToken } from '@/utils/token';
import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import { formHandler } from '@/components/ui/Form';
import { userGender } from '@/data/AuthData';
import { ApiContainer } from '@/api/api';
import EmailStep from '@/page/auth/register/EmailStep';
import useApi from '@/hooks/useApi';

interface RegisterFormProps {
	[key: string]: string | boolean;
}

// const userRegister = async (
// 	api: ApiContainer,
// 	funnelForm: RegisterFormProps,
// 	setCookie: (name: 'refreshToken', value: any, options?: any | undefined) => void,
// 	navigator: NavigateFunction
// ) => {
// 	const result = await api.call('post', 'signup', funnelForm);
// 	if (result?.success) {
// 		setToken('accessToken', result.data.accessToken);
// 		getToken('accessToken');
// 		navigator('/explorer');
// 	} 
// };

const Register = ({onClick} : {onClick: (prev: boolean) => void}) => {
	const [Funnel, setStep] = useFunnel(
		['id', 'userinfo', 'address', 'gender', 'complete'] as const,
		'id',
	);
	const api = useApi();
	const [_, setCookie] = useCookies();
	const [funnelForm, setFunnelForm] = useState<RegisterFormProps>({
		gender: 'male',
		address: "",
	});
	const navigator = useNavigate();
	const onSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		step?: 'id' | 'userinfo' | 'address' | 'gender' | 'complete',
		nextStep?: 'id' | 'userinfo' | 'address' | 'gender' | 'complete',
	) => {
		e.preventDefault();
		if (nextStep) {
			const data = formHandler(e.currentTarget);
			setFunnelForm((prev) => ({ ...prev, ...data }));
			setStep(nextStep);
			return;
		}
		if (step === 'complete' && !nextStep) {
			const data = await api('post', 'register', funnelForm)
		}
	};
	return (
		<Funnel>
			<Funnel.Step name="id">
				<EmailStep<['id' | 'userinfo' | 'address' | 'gender' | 'complete']>
					onSubmit={onSubmit}
					setForm={setFunnelForm}
					step={'id'}
					nextStep={'userinfo'}
				>
					<Button onClick={onClick}>
						Sign In
					</Button>
				</EmailStep>
			</Funnel.Step>
			<Funnel.Step name="userinfo">
				<Form onSubmit={async (e) => onSubmit(e, 'userinfo', 'address')}>
					<InputContainer name="firstName" id="firstName" type="text" required={true} />
					<InputContainer
						name="lastName"
						id="lastName"
						type="text"
						required={true}
						notFocus={true}
					/>
					<Button>다음</Button>
				<Button onClick={onClick}>
					Sign In
				</Button>
				</Form>

			</Funnel.Step>
			<Funnel.Step name="address">
				<Form onSubmit={async (e) => onSubmit(e, 'address', 'gender')}>
					<Button>집주소</Button>
				</Form>
				<Button onClick={onClick}>
					Sign In
				</Button>
			</Funnel.Step>
			<Funnel.Step name="gender">
				<Form onSubmit={async (e) => onSubmit(e, 'gender', 'complete')}>
					<Select name="gender" id="gender" default={funnelForm.gender as string}>
						{userGender.map((item) => (
							<option key={`gender_${item}`} value={item}>
								{item}
							</option>
						))}
					</Select>
					<div>

					<Button>다음</Button>
					<Button onClick={onClick}>
						Sign In
					</Button>
					</div>
				</Form>
				
			</Funnel.Step>
			<Funnel.Step name="complete">
				<Form onSubmit={async (e) => onSubmit(e, "complete")}>
					<Button>done</Button>
					<Button onClick={onClick}>
						Sign In
					</Button>
				</Form>
			</Funnel.Step>
		</Funnel>
	);
};

export default Register;
