import Button from '@/components/ui/Button';
import Form, { formHandler } from '@/components/ui/Form';
import InputContainer from '@/components/InputContainer';
import { userGender, userRegister } from '@/data/AuthData';
import { ModalContext } from '@/provider/ModalProvider';
import { forwardRef, useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import { useCookies } from 'react-cookie';
import { deleteToken, getToken, setToken } from '@/utils/token';
import useFunnel from '@/hooks/useFunnel';
import { GenderForm } from '../user/ChangeProfile';
import Select from '@/components/ui/Select';

interface RegisterFormProps {
  id: string;
  firstName: string;
  lastName: string;
  location?: string;
  gender: string;
}

const Register = () => {
  const [Funnel, setStep] = useFunnel(
    ['id', 'userinfo', 'address', 'gender', 'complete'] as const,
    'id',
  );
  const { modalProp, setModal } = useContext(ModalContext);
  const api = useContext(ApiContainers);
  const [_, setCookie] = useCookies(['refreshToken']);
  const [funnelForm, setFunnelForm] = useState<RegisterFormProps>({
    id: '',
    firstName: '',
    lastName: '',
    gender: 'male',
    location: '',
  });

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   const obj: Record<string, FormDataEntryValue> = {};
  //   for (let [key, value] of data.entries()) {
  //     obj[key] = value;
  //   }
  //   const result = await api.call('get', 'register', obj, 'https://randomuser.me/api');
  //   if (result?.success) {
  //     setCookie('refreshToken', result.refreshToken, { path: '/' });
  //     setToken('accessToken', result.data.accessToken);
  //     getToken('accessToken');
  //   }
  // };
  return (
    <Funnel>
      <Funnel.Step name="id">
        <h3 onClick={() => setStep('userinfo')}>가입방식</h3>
      </Funnel.Step>
      <Funnel.Step name="userinfo">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const data = formHandler(e.currentTarget);
            setFunnelForm((prev) => ({ ...prev, ...data }));
            setStep('address');
          }}
        >
          <InputContainer
            name="firstName"
            id="firstName"
            type="text"
            required={true}
          ></InputContainer>
          <InputContainer
            name="lastName"
            id="lastName"
            type="text"
            required={true}
          ></InputContainer>
          <Button>다음</Button>
        </Form>
      </Funnel.Step>
      <Funnel.Step name="address">
        <h3 onClick={() => setStep('gender')}>집주소</h3>
      </Funnel.Step>
      <Funnel.Step name="gender">
        <Select
          name="gender"
          id="gender"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const {
              target: { value },
            } = e;
            setFunnelForm((prev) => {
              return { ...prev, gender: value };
            });
          }}
        >
          {userGender.map((item) => (
            <option key={`gender_${item}`} value={item} selected={item === funnelForm.gender}>
              {item}
            </option>
          ))}
        </Select>
        <button
          onClick={() => {
            setStep('complete');
          }}
        >
          다음
        </button>
      </Funnel.Step>
      <Funnel.Step name="complete">
        <h3
          onClick={() => {
            console.log('완료');
            console.log(funnelForm);
          }}
        >
          가입완료
        </h3>
      </Funnel.Step>
    </Funnel>
    // <Form onSubmit={onSubmit}>
    //   <div>
    //     <h1>Sign up</h1>
    //     <p>Sgin your account!</p>
    //   </div>
    //   {userRegister.map((item) => (
    //     <InputContainer {...item} />
    //   ))}
    //   <Button type="submit">Sign up</Button>
    //   <h2>
    //     Do you have an account?
    //     {modalProp.modalType === 'signUpModal' ? (
    //       <Button onClick={() => setModal({ modalType: 'loginModal', toggle: true })}>
    //         Sign In
    //       </Button>
    //     ) : (
    //       <Link to="/login">Login</Link>
    //     )}
    //   </h2>
    // </Form>
  );
};

export default Register;
