import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface InputProps {
  isFocus?: boolean;
  id?: string;
  onChange?: (props: any) => any;
  placeholder?: string;
  required?: boolean;
  type?: string;
  name?: string;
  notFocus?: boolean;
  children?: React.ReactNode;
  value?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

const InputContainer = styled.input<InputProps>`
  width: 100%;
  min-height: 40px;
`;

const Input: React.FC<InputProps> = ({ onChange, name, type, value, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <InputContainer
      onChange={onChange}
      ref={ref}
      type={type}
      name={name}
      autoComplete={type !== 'password' ? `given-${name}` : 'off'}
      defaultValue={value}
      {...rest}
    />
  );
};

export default Input;
