import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Form, { formHandler } from '@/components/ui/Form';
import useApi from '@/hooks/useApi';
import { RegisterFormProps } from '@/types';
import { ReactNode, forwardRef, useRef, useState } from 'react';

/*
        <InputContainer
          name="email"
          id="email"
          type="email"
          defaultValue={data?.email}
          pattern={'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'}
        >
          <Button onClick={(e) => submitHandler('button2')(e)}>중복 확인</Button>
        </InputContainer>
        <InputContainer
          name="password"
          id="password"
          type="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$"
        />
        */

const ForwardForm = forwardRef<HTMLFormElement>(function (props, ref) {
  return <Form ref={ref} {...props} />;
});

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
    uid: string;
    email: string;
  };
  children?: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, step?: T[number], nextStep?: T[number]) => void;
  updated: boolean;
  focus?: <T extends HTMLElement>(props: T) => boolean;
}) => {
  const ref = useRef<HTMLFormElement>();
  const api = useApi();
  const [verifyData, setVerifyData] = useState<Partial<Record<string, string>>>({
    uid: data?.uid || '',
    verifyUid: data?.uid || '',
    email: data?.email || '',
    verifyEmail: data?.email || '',
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>, res?: string) => {
    e.preventDefault();
    console.log(res);
    console.log(ref.current);
  };

  return (
    <>
      <ForwardForm onSubmit={submitHandler} ref={ref}>
        <InputContainer name="uid" id="uid" type="text" defaultValue={data?.uid}>
          <Button type="button" onClick={() => {}}>
            btn1
          </Button>
        </InputContainer>
        <InputContainer
          name="email"
          id="email"
          type="email"
          defaultValue={data?.email}
          pattern={'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'}
        >
          <Button
            type="submit"
            onClick={(e) => {
              submitHandler(e, 'test');
            }}
          >
            btn2
          </Button>
        </InputContainer>
        <InputContainer
          name="password"
          id="password"
          type="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$"
        />
        <button type="submit">다음</button>
      </ForwardForm>
    </>
  );
};

export default EmailStep;
