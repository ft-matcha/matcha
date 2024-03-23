import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Form, { formHandler } from '@/components/ui/Form';
import useApi from '@/hooks/useApi';
import { RegisterFormProps } from '@/types';
import { FormEvent, ReactNode, useState, Children } from 'react';

const filter = (props: [string]) => (e: any) => {
  if (props.includes(e.target.name)) {
    return e.target.value;
  }
};

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
  const api = useApi();
  const [verifyData, setVerifyData] = useState<Partial<Record<string, string>>>({
    uid: data?.uid || '',
    verifyUid: data?.uid || '',
    email: data?.email || '',
    verifyEmail: data?.email || '',
  });

  const getExistsValue = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // const previous = e.currentTarget.previousElementSibling as HTMLElement;
    // const idValue = previous?.id;
    // const curValue = (previous as HTMLInputElement).value;

    // if (curValue !== checkedEmail[idValue as string]) {
    //   const response = await api('get', 'register', { [idValue]: curValue });
    //   if (response) {
    //     setCheckedEmail((prev: Partial<Record<string, string>>) => ({
    //       ...prev,
    //       [idValue]: curValue,
    //     }));
    //     setFunnel((prev: Partial<Record<string, any>>) => ({
    //       ...prev,
    //       [idValue]: curValue,
    //     }));
    //   }
    // }
  };

  const verify = (obj: Record<string, string>) => {
    Object.entries(obj).forEach(([key, value]) => {
      obj[`verify${key}`] = value;
    });
    console.log(obj);
    return obj;
  };
  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const obj = formHandler(e.currentTarget as HTMLFormElement);
          setVerifyData((prev: Partial<Record<string, string>>) => ({ ...prev, ...verify(obj) }));
          if (obj.uid && obj.email && obj.password) {
            onSubmit(e, step, nextStep);
            // setFunnel((prev: Partial<Record<string, string>>) => ({ ...prev, ...obj }));
          }
        }}
      >
        <InputContainer name="uid" id="uid" type="text" defaultValue={data?.uid}>
          <button onClick={(e) => {}}>id 중복 확인</button>
        </InputContainer>
        <InputContainer
          name="email"
          id="email"
          type="email"
          defaultValue={data?.email}
          pattern={'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'}
        >
          <Button>중복 확인</Button>
        </InputContainer>
        <InputContainer
          notFocus={updated}
          name="password"
          id="password"
          type="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$"
        />
        <Button>다음</Button>
        {children}
      </Form>
    </>
  );
};

export default EmailStep;
