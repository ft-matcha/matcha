import Button from '@/components/ui/Button';
import useApi from '@/hooks/useApi';
import UserStep from '@/page/step/UserStep';

const Register = ({ onClick }: { onClick: (props: boolean) => void }) => {
  const api = useApi();

  return (
    <UserStep
      title={'회원가입'}
      api={async (funnelForm, data) =>
        await api('post', 'register', Object.assign(funnelForm, { address: data }), true)
      }
    >
      <Button onClick={onClick}>로그인</Button>
    </UserStep>
  );
};

export default Register;
