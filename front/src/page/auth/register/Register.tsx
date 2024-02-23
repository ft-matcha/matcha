import useFunnel from '@/hooks/useFunnel';
import Select from '@/components/ui/Select';
import { useContext, useState } from 'react';
import { ModalContext } from '@/provider/ModalProvider';
import { useCookies } from 'react-cookie';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import { Form } from 'react-router-dom';
import { getToken, setToken } from '@/utils/token';
import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import { formHandler } from '@/components/ui/Form';
import { userGender } from '@/data/AuthData';
import { ApiContainer } from '@/api/api';
import EmailStep from '@/page/auth/register/EmailStep';

interface RegisterFormProps {
  [key: string]: string | boolean;
}

const userRegister = async (
  api: ApiContainer,
  funnelForm: RegisterFormProps,
  setCookie: (name: 'refreshToken', value: any, options?: any | undefined) => void,
  setModal: (modalProps: any) => any,
) => {
  const result = await api.call('get', 'register', funnelForm, 'https://randomuser.me/api');
  if (result?.success) {
    setCookie('refreshToken', result.refreshToken, { path: '/' });
    setToken('accessToken', result.data.accessToken);
    getToken('accessToken');
  }
  setModal(() => ({ modalType: '', toggle: false }));
};

const Register = () => {
  const [Funnel, setStep] = useFunnel(
    ['id', 'userinfo', 'address', 'gender', 'complete'] as const,
    'id',
  );
  const { setModal } = useContext(ModalContext);
  const api = useContext(ApiContainers);
  const [_, setCookie] = useCookies(['refreshToken']);
  const [funnelForm, setFunnelForm] = useState<RegisterFormProps>({
    emailValid: false,
    gender: 'male',
  });

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    nextStep?: 'id' | 'userinfo' | 'address' | 'gender' | 'complete',
  ) => {
    e.preventDefault();
    if (nextStep && funnelForm.emailValid) {
      const data = formHandler(e.currentTarget);
      setFunnelForm((prev) => ({ ...prev, ...data }));
      setStep(nextStep);
      return;
    }
    await userRegister(api, funnelForm, setCookie, setModal);
  };
  return (
    <Funnel>
      <Funnel.Step name="id">
        <EmailStep<['id' | 'userinfo' | 'address' | 'gender' | 'complete']>
          api={api}
          onSubmit={onSubmit}
          setForm={setFunnelForm}
        />
      </Funnel.Step>
      <Funnel.Step name="userinfo">
        <Form onSubmit={(e) => onSubmit(e, 'address')}>
          <InputContainer name="firstName" id="firstName" type="text" required={true} />
          <InputContainer
            name="lastName"
            id="lastName"
            type="text"
            required={true}
            notFocus={true}
          />
          <Button>다음</Button>
        </Form>
      </Funnel.Step>
      <Funnel.Step name="address">
        <Form onSubmit={(e) => onSubmit(e, 'gender')}>
          <Button>집주소</Button>
        </Form>
      </Funnel.Step>
      <Funnel.Step name="gender">
        <Form onSubmit={(e) => onSubmit(e, 'complete')}>
          <Select name="gender" id="gender" default={funnelForm.gender as string}>
            {userGender.map((item) => (
              <option key={`gender_${item}`} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Button>다음</Button>
        </Form>
      </Funnel.Step>
      <Funnel.Step name="complete">
        <Form onSubmit={onSubmit}>
          <Button>done</Button>
        </Form>
      </Funnel.Step>
    </Funnel>
  );
};

export default Register;
