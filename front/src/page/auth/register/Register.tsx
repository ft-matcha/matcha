import Button from '@/components/ui/Button';
import useApi from '@/hooks/useApi';
import UserStep from '@/page/step/UserStep';
import { useNavigate } from 'react-router-dom';

const Register = ({ onClick }: { onClick: (props: boolean) => void }) => {
  const api = useApi();
  const navigator = useNavigate();

  return (
    <UserStep
      title={'회원가입'}
      status="register"
      submit={(data: Record<string, any>) => {
        api('post', 'register', data, true).then((res) => {
          navigator('/explorer');
        });
      }}
    >
      <Button onClick={onClick}>로그인</Button>
    </UserStep>
  );
};

export default Register;
