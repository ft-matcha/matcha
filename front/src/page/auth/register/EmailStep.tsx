import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Form, { formHandler } from '@/components/ui/Form';
import useApi from '@/hooks/useApi';
import { FormProps, RegisterFormProps } from '@/types';
import { ReactNode, RefObject, forwardRef, useRef, useState } from 'react';

const ForwardForm = forwardRef<HTMLFormElement, FormProps>(function (
  { onSubmit, children, ...rest },
  ref,
) {
  const formRef: RefObject<HTMLFormElement> = ref as RefObject<HTMLFormElement>;
  return (
    <Form ref={formRef} {...rest} onSubmit={onSubmit} {...rest}>
      {children}
    </Form>
  );
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
  const ref = useRef<HTMLFormElement>(null);
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
