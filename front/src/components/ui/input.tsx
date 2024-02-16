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
  notFocus?: boolean;
  children?: React.ReactNode;
}

const InputContainer = styled.input<InputProps>`
  width: 100%;
  min-height: 40px;
  background: transparent;
`;

const Input: React.FC<InputProps> = ({ onChange, notFocus, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (notFocus) {
      return;
    }
    ref.current && ref.current.focus();
  }, []);

  return <InputContainer onChange={onChange} ref={ref} {...rest} />;
};

export default Input;
