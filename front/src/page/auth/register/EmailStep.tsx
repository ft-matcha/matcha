import { ApiContainer } from '@/api/api';
import { uniqueEmail } from '@/api/uniqueEmail';
import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import useApi from '@/hooks/useApi';
import { useRef, ReactNode } from 'react';

const EmailStep = <T extends readonly string[]>({
	step,
	nextStep,
	onSubmit,
	setForm,
	children
}: {
	step: T[number];
	nextStep: T[number];
	children?: ReactNode;
	onSubmit: (e: React.FormEvent<HTMLFormElement>, step?: T[number], nextStep?: T[number]) => void;
	setForm: (
		update: (prev: Record<string, string | boolean>) => Record<string, string | boolean>
	) => void;
}) => {
	const ref = useRef(false);
	const api = useApi();
	return (
		<>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					if (ref.current) {
						onSubmit(e, step, nextStep);
					}
				}}
			>
				<InputContainer name="email" id="email" type="email" required={true}>
					<Button
						type="button"
						onClick={async (e) => {
							e.preventDefault();
							const email = e.currentTarget.previousElementSibling;
							const response = await api('get', 'register', { email });
							if (response?.success) {
								// setForm((prev) => ({ ...prev, emailValid: true }));
								ref.current = true;
							} else if (email) {
								email.focus();
							}
						}}
					>
						중복 확인
					</Button>
				</InputContainer>
				<InputContainer
					notFocus={true}
					name="password"
					id="password"
					type="password"
					required={true}
				/>
				<Button>다음</Button>
				{children}
			</Form>
		</>
	);
};

export default EmailStep;
