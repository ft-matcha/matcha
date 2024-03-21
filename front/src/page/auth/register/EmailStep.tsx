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
  data,
  children,
  updated,
  focus,
}: {
  step: T[number];
  nextStep: T[number];
  setFunnel: React.Dispatch<React.SetStateAction<Partial<RegisterFormProps>>>;
  data?: {
    id: string;
    email: string;
  };
  children?: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, step?: T[number], nextStep?: T[number]) => void;
  updated: boolean;
  focus?: <T extends HTMLElement>(props: T) => boolean;
}) => {
  const api = useApi();
  const [checkedEmail, setCheckedEmail] = useState<Partial<Record<string, string>>>({
    id: data?.id || '',
    email: data?.email || '',
  });

  const getExistsValue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const previous = e.currentTarget.previousElementSibling as HTMLElement;
    const idValue = previous?.id;
    const curValue = (previous as HTMLInputElement).value;

    if (curValue !== checkedEmail[idValue as string]) {
      const temp = `${idValue}`;
      const response = await api('get', 'register', { [temp]: curValue });
      if (response) {
        setCheckedEmail((prev: Partial<Record<string, string>>) => ({
          ...prev,
          [idValue]: curValue,
        }));
        setFunnel((prev: Partial<Record<string, any>>) => ({
          ...prev,
          [idValue]: curValue,
        }));
      }
    }
  };

  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          if (focus && focus(e.currentTarget)) {
            return;
          }
          if (checkedEmail.id !== '' && checkedEmail.email !== '') {
            onSubmit(e, step, nextStep);
          }
        }}
      >
        <InputContainer
          name="id"
          id="id"
          type="text"
          required={updated ? false : true}
          defaultValue={data?.id}
        >
          <button type="button" onClick={getExistsValue}>
            id 중복 확인
          </button>
        </InputContainer>
        <InputContainer
          name="email"
          id="email"
          type="email"
          required={updated ? false : true}
          defaultValue={data?.email}
          pattern={'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'}
        >
          <Button as="button" onClick={getExistsValue}>
            중복 확인
          </Button>
        </InputContainer>
        <InputContainer
          notFocus={updated}
          name="password"
          id="password"
          type="password"
          required={!updated ? (!data?.email ? false : true) : false}
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$"
        />
        <Button>다음</Button>
        {children}
      </Form>
    </>
  );
};

export default EmailStep;
