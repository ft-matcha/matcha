import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import useApi from '@/hooks/useApi';
import { RegisterFormProps } from '@/types';
import { ReactNode, useState } from 'react';

const EmailStep = <T extends readonly string[]>({
  step,
  nextStep,
  setFunnel,
  onSubmit,
  email,
  children,
  updated,
}: {
  step: T[number];
  nextStep: T[number];
  setFunnel: React.Dispatch<React.SetStateAction<Partial<RegisterFormProps>>>;
  email?: string;
  children?: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, step?: T[number], nextStep?: T[number]) => void;
  updated: boolean;
}) => {
  const api = useApi();
  const [checkedEmail, setCheckedEmail] = useState<string>(email ? email : '');
  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          onSubmit(e, step, nextStep);
        }}
      >
        <InputContainer
          name="email"
          id="email"
          type="email"
          required={updated ? false : true}
          defaultValue={checkedEmail}
          pattern={'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'}
        >
          <Button
            type="button"
            onClick={async (e) => {
              const curEmail = e.currentTarget.parentNode.children['email'].value;
              if (curEmail !== checkedEmail) {
                const response = await api('get', 'register', { email: curEmail });
                if (response) {
                  setCheckedEmail(curEmail);
                  setFunnel((prev: any) => ({ ...prev, email: curEmail }));
                }
                return;
              }
            }}
          >
            중복 확인
          </Button>
        </InputContainer>
        <InputContainer
          notFocus={updated}
          name="password"
          id="password"
          type="password"
          required={!updated ? (!email ? false : true) : false}
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$"
        />
        <Button>다음</Button>
        {children}
      </Form>
    </>
  );
};

export default EmailStep;
