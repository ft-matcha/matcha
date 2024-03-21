import { InputContainerProps } from '@/types';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/input';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
`

const InputContainer: React.FC<InputContainerProps> = ({ name, children, readOnly, ...rest }) => {
  return (
    <Container>
      <Label htmlFor={name}>{name}</Label>
      <Input name={name} readOnly={readOnly} {...rest}></Input>
      {children}
    </Container>
  );
};

export default InputContainer;
