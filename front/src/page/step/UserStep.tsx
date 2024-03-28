import useFunnel from '@/hooks/useFunnel';
import { useRef, useState } from 'react';
import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Form, { formHandler } from '@/components/ui/Form';
import { FunnelProps, RegisterFormProps, StepProps } from '@/types';
import DatePicker from '@/components/DatePicker';
import { userRegister } from '@/data/AuthData';

const userGen = <T extends string>(
  Funnel: ((props: Omit<FunnelProps<T[]>, 'step'>) => JSX.Element) & {
    Step: (props: StepProps<T[]>) => JSX.Element;
  },
  item: {
    name: T;
    id: T;
    type: string;
    next?: T;
  }[],
  setFunnel: React.Dispatch<React.SetStateAction<Partial<RegisterFormProps | undefined>>>,
  setStep: React.Dispatch<React.SetStateAction<T>>,
) => {
  const onNext = (cur: T) => (next: T) => (value: string) => {
    // todo check is true data
    if (cur === 'id' || cur === 'email') {
      console.log('will be checked duplicated');
    }
    setFunnel((prev) => (prev ? { ...prev, [cur]: value } : { [cur]: value }));
    setStep(next);
  };
  return item.map(({ name, id, type, next, ...rest }) => (
    <Funnel.Step name={name} key={`funnel_${name}`}>
      <InputContainer
        name={name}
        id={id}
        type={type}
        required={true}
        placeholder={name}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            onNext(name)(next as T)(e.currentTarget.value);
          }
        }}
        {...rest}
      />
      <Button
        onClick={(e) => {
          onNext(name)(next as T)(e.currentTarget.previousElementSibling?.value);
        }}
      >
        다음
      </Button>
    </Funnel.Step>
  ));
};

const UserStep = ({
  title,
  children,
  api,
  funnelData,
  focus,
  defaultData = userRegister,
}: {
  title?: string;
  children: React.ReactNode;
  api: (obj: any, data: any) => any;
  funnelData?: RegisterFormProps;
  focus?: <T extends HTMLElement>(props: T) => boolean;
  defaultData?: typeof userRegister;
}) => {
  const [Funnel, setStep] = useFunnel(
    ['id', 'email', 'password', 'name', 'complete'] as const,
    'id',
    title,
  );
  const addressRef = useRef<{
    address: string;
    coord: {
      latitude: number;
      longitude: number;
    };
  } | null>(null);
  const [funnelForm, setFunnelForm] = useState<Partial<RegisterFormProps | undefined>>(funnelData);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(funnelForm);
  };
  return (
    <Funnel>
      {userGen(Funnel as any, defaultData as any, setFunnelForm, setStep)}
      <Funnel.Step name="complete">
        <Form onSubmit={onSubmit}>
          <Button>done</Button>
          {children}
        </Form>
      </Funnel.Step>
    </Funnel>
  );
};

export default UserStep;
