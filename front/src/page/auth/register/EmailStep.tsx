import { ApiContainer } from '@/api/api';
import { uniqueEmail } from '@/api/uniqueEmail';
import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Span from '@/components/ui/Span';
import useApi from '@/hooks/useApi';
import { useRef, ReactNode, useState, useEffect } from 'react';

const EmailStep = <T extends readonly string[]>({
	step,
	nextStep,
	setFunnel,
	onSubmit,
	email,
	children
}: {
	step: T[number];
	nextStep: T[number];
	setFunnel: (props: (data: Record<string, any>) => Record<string, any> | Record<string, any> ) => void;
	email?: string,
	children?: ReactNode;
	onSubmit: (e: React.FormEvent<HTMLFormElement>, step?: T[number], nextStep?: T[number]) => void;
}) => {
	const api = useApi();
	
	return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!email) {
            const curEmail = e.currentTarget.email.value;
            const response = await api('get', 'register', { email: curEmail });
            if (response) {
              setFunnel((prev) => ({ ...prev, email: curEmail }));
            }
            return;
          }
          onSubmit(e, step, nextStep);
        }}
      >
        <InputContainer
          name="email"
          id="email"
          type="email"
          required={true}
          value={email ? email : undefined}
          readOnly={email ? true : false}
          pattern={'.+@gmail.com'}
        >
          <Button disabled={email}>중복 확인</Button>
        </InputContainer>
        <InputContainer
          notFocus={email ? true : undefined}
          name="password"
          id="password"
          type="password"
          required={email ? true : undefined}
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$"
        />
        <Button>다음</Button>
        {children}
      </Form>
    </>
  );
};

export default EmailStep;
