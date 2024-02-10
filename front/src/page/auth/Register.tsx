import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import InputContainer from '@/components/InputContainer';
import { userInfo } from '@/data/AuthData';
import { ModalContext } from '@/provider/ModalProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const { modalProp, setModal } = useContext(ModalContext);
  return (
    <Form>
      {userInfo.map((item) => (
        <InputContainer {...item} />
      ))}
      <Button type="submit">Sign up</Button>
      <h2>
        Do you have an account?
        {modalProp.modalType === 'signUpModal' ? (
          <Button onClick={() => setModal({ modalType: 'loginModal', toggle: true })}>
            Sign In
          </Button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </h2>
    </Form>
  );
};

export default Register;
