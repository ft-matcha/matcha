import { InputContainerProps } from '@/types';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/input';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
`

const InputContainer: React.FC<InputContainerProps> = ({
  name,
  id,
  children,
  readOnly,
  ...rest
}) => {
  return (
    <>
      <Label htmlFor={id}>{name}</Label>
      <Input name={name} id={id} readOnly={readOnly} {...rest}></Input>
      {children}
    </>
  );
};

export default InputContainer;
