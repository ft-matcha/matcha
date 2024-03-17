import useFunnel from '@/hooks/useFunnel';
import Select from '@/components/ui/Select';
import { useEffect, useRef, useState } from 'react';
import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Form, { formHandler } from '@/components/ui/Form';
import { userGender } from '@/data/AuthData';
import EmailStep from '@/page/auth/register/EmailStep';
import GeoLocation from '@/page/location/GeoLocation';
import { RegisterFormProps } from '@/types';

const UserStep = ({
  title,
  children,
  api,
  funnelData,
  updated = false,
}: {
  title?: string;
  children: React.ReactNode;
  api: (obj: any, data: any) => any;
  funnelData?: RegisterFormProps;
  updated?: boolean;
}) => {
  const [Funnel, setStep] = useFunnel(
    ['id', 'userinfo', 'address', 'gender', 'complete'] as const,
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
  const [funnelForm, setFunnelForm] = useState<Partial<RegisterFormProps>>(
    funnelData
      ? {
          ...funnelData,
        }
      : {
          gender: 'male',
          preference: 'female',
        },
  );
  console.log(funnelForm);
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    step?: 'id' | 'userinfo' | 'address' | 'gender' | 'complete',
    nextStep?: 'id' | 'userinfo' | 'address' | 'gender' | 'complete',
  ) => {
    e.preventDefault();
    if (nextStep) {
      const data = formHandler(e.currentTarget);
      setFunnelForm((prev: any) => ({ ...prev, ...data }));
      setStep(nextStep);
      return;
    }
    if (step === 'complete' && !nextStep) {
      api(funnelForm, addressRef.current);
    }
  };
  return (
    <Funnel>
      <Funnel.Step name="id">
        <EmailStep<['id' | 'userinfo' | 'address' | 'gender' | 'complete']>
          onSubmit={onSubmit}
          setFunnel={setFunnelForm}
          email={funnelForm?.email as string | undefined}
          step={'id'}
          nextStep={'userinfo'}
          updated={updated}
        >
          {children}
        </EmailStep>
      </Funnel.Step>
      <Funnel.Step name="userinfo">
        <Form onSubmit={async (e) => onSubmit(e, 'userinfo', 'address')}>
          <InputContainer
            name="firstName"
            id="firstName"
            type="text"
            required={true}
            defaultValue={funnelForm?.firstName as string}
          />
          <InputContainer
            name="lastName"
            id="lastName"
            type="text"
            required={true}
            notFocus={true}
            defaultValue={funnelForm?.lastName as string}
          />
          <Button>다음</Button>
          {children}
        </Form>
      </Funnel.Step>
      <Funnel.Step name="address">
        <Form onSubmit={async (e) => onSubmit(e, 'address', 'gender')}>
          <GeoLocation addressRef={addressRef}>
            <Button>집주소</Button>
          </GeoLocation>
        </Form>
        {children}
      </Funnel.Step>
      <Funnel.Step name="gender">
        <Form onSubmit={async (e) => onSubmit(e, 'gender', 'complete')}>
          <Select name="gender" id="gender" default={funnelForm?.gender as string}>
            {userGender.map((item) => (
              <option key={`gender_${item}`} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Select name="preference" id="preference" default={funnelForm?.preference as string}>
            {userGender.map((item) => (
              <option key={`gender_${item}`} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <div>
            <Button>다음</Button>
            {children}
          </div>
        </Form>
      </Funnel.Step>
      <Funnel.Step name="complete">
        <Form onSubmit={async (e) => onSubmit(e, 'complete')}>
          <Button>done</Button>
          {children}
        </Form>
      </Funnel.Step>
    </Funnel>
  );
};

export default UserStep;
