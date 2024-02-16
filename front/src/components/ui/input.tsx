import debounce from '@/utils/debounce';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface InputProps {
  isFocus?: boolean;
  id?: string;
  onChange?: (props: any) => any;
  placeholder?: string;
  required?: boolean;
  type?: string;
  name?: string;
  children?: React.ReactNode;
}

const InputContainer = styled.input<InputProps>`
  width: 100%;
  min-height: 40px;
  background: transparent;
`;

const Input: React.FC<InputProps> = ({ onChange, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current ? ref.current.focus() : null;
  }, []);

  return <InputContainer onChange={onChange} ref={ref} {...rest} />;
};

export default Input;
