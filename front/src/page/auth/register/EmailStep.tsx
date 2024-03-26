import InputContainer from '@/components/InputContainer';
import Button from '@/components/ui/Button';
import Form, { formHandler } from '@/components/ui/Form';
import useApi from '@/hooks/useApi';
import { FormProps, RegisterFormProps } from '@/types';

const BackendConnectedStep = ({
  data,
  name,
  setFunnel,
}: {
  name: string;
  data?: string;
  setFunnel: React.Dispatch<React.SetStateAction<Partial<RegisterFormProps>>>;
}) => {
  const api = useApi();
  return (
    <>
      <InputContainer
        name={name}
        id={name}
        type={name === 'email' ? 'email' : 'text'}
        defaultValue={data}
        pattern={'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'}
      >
        <Button type="button" onClick={async (e) => {}}>
          btn2
        </Button>
      </InputContainer>
    </>
  );
};

export default BackendConnectedStep;
