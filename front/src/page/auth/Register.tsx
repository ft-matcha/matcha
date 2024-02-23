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

interface RegisterFormProps {
  [key: string]: string | boolean;
}

const uniqueEmail = async (api: ApiContainer, email: string) => {
  console.log(email);
  const result = await api.call('get', 'register', { email });
  return Promise.resolve({
    success: false,
  });
  // return result;
};

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
    next?: 'id' | 'userinfo' | 'address' | 'gender' | 'complete',
  ) => {
    e.preventDefault();
    if (next && funnelForm.emailValid) {
      const data = formHandler(e.currentTarget);
      setFunnelForm((prev) => ({ ...prev, ...data }));
      setStep(next);
      return;
    }
    await userRegister(api, funnelForm, setCookie, setModal);
  };
  return (
    <Funnel>
      <Funnel.Step name="id">
        <Form onSubmit={(e) => onSubmit(e, 'userinfo')}>
          <InputContainer name="email" id="email" type="email" required={true}>
            <Button
              onClick={async (e) => {
                e.preventDefault();
                const email = e.currentTarget.previousElementSibling;
                const response = await uniqueEmail(api, email.value);
                if (response?.success) {
                  setFunnelForm((prev) => ({ ...prev, emailValid: true }));
                } else if (email) {
                  email.focus();
                }
              }}
            >
              중복 확인
            </Button>
          </InputContainer>
          <InputContainer
            notFocus={true}
            name="password"
            id="password"
            type="password"
            required={true}
          />
          <Button>다음</Button>
        </Form>
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
          <h3>가입완료</h3>
          <Button>done</Button>
        </Form>
      </Funnel.Step>
    </Funnel>
  );
};

export default Register;
