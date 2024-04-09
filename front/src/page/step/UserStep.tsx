import useFunnel from '@/hooks/useFunnel';
import { useEffect, useRef, useState } from 'react';
import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import { FunnelProps, RegisterFormProps, StepProps } from '@/types';
import { userRegister } from '@/data/AuthData';
import useApi from '@/hooks/useApi';
import styled from 'styled-components';
import { removeEmptyValue } from '@/utils/utils';

const FunnelContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  text-align: start;
  width: 300px;
  button {
    width: fit-content;
  }
`;

const useGen =
  (children?: React.ReactNode) =>
  (status: 'register' | 'profile') =>
  <T extends string>(
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
    api: (
      type: 'get' | 'post' | 'put',
      url: string,
      params?: Record<string, any> | undefined,
      auth?: boolean | undefined,
    ) => Promise<any>,
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const onNext = (cur: T) => (next: T) => async (value: string) => {
      try {
        const obj: Record<string, string> = {};
        ref.current?.querySelectorAll('input').forEach((item) => {
          if (item.id === 'id') {
            obj['uid'] = item.value;
            return;
          }
          obj[`${item.id}`] = item.value;
        });
        if (cur === 'id' || cur === 'email') {
          const res = await api('get', 'register', obj);
          if (!res) {
            throw Error('error');
          }
        }
        setFunnel((prev) => ({ ...prev, ...obj }));
        setStep(next);
      } catch (e) {}
    };
    return item.map(({ name, id, type, next, ...rest }) => (
      <Funnel.Step name={name} key={`funnel_${name}`}>
        <FunnelContainer>
          <div ref={ref}>
            {name === 'name' ? (
              <>
                <InputContainer
                  name={`firstName`}
                  id={`firstName`}
                  type={type}
                  required={status === 'register'}
                  placeholder={name}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {}}
                />
                <InputContainer
                  name={`lastName`}
                  id={`lastName`}
                  type={type}
                  required={status === 'register'}
                  placeholder={name}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      onNext(name)(next as T)(e.currentTarget.value);
                    }
                  }}
                />
                <Button
                  onClick={(e) => {
                    onNext(name)(next as T)(e.currentTarget.previousElementSibling?.value);
                  }}
                >
                  다음
                </Button>
              </>
            ) : (
              <>
                <InputContainer
                  name={name}
                  id={id}
                  type={type}
                  required={status === 'register'}
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
              </>
            )}
          </div>
          {children}
        </FunnelContainer>
      </Funnel.Step>
    ));
  };

const UserStep = ({
  title,
  children,
  status,
  defaultData = userRegister,
  submit,
}: {
  title?: string;
  children: React.ReactNode;
  status: 'register' | 'profile';
  defaultData?: typeof userRegister | RegisterFormProps;
  submit: (data: Record<string, any>) => void;
}) => {
  const api = useApi();
  const [Funnel, setStep] = useFunnel(
    ['id', 'email', 'password', 'name', 'complete'] as const,
    'id',
    title,
  );
  const [funnelForm, setFunnelForm] = useState<Partial<RegisterFormProps | undefined>>(() => {
    if (status === 'register') {
      return undefined;
    }
    return defaultData as RegisterFormProps;
  });
  const userGenSetChildren = useGen(children)(status);
  return (
    <Funnel>
      {userGenSetChildren(Funnel as any, defaultData as any, setFunnelForm, setStep, api)}
      <Funnel.Step name="complete">
        <FunnelContainer>
          <Button
            onClick={() => {
              alert('done!');
              const obj = removeEmptyValue(funnelForm as Record<string, any>);
              submit(obj);
            }}
          >
            done
          </Button>
          {children}
        </FunnelContainer>
      </Funnel.Step>
    </Funnel>
  );
};

export default UserStep;
