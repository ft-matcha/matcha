import InputContainer from '@/components/InputContainer';
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
  return (
    <>
      <InputContainer
        name={name}
        id={name}
        type={name === 'email' ? 'email' : 'text'}
        defaultValue={data}
        pattern={'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'}
      />
    </>
  );
};

export default BackendConnectedStep;
