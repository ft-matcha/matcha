import { FormProps } from '@/types';
import { RefObject } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form<FormProps>`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (width ? width : '300px')};
  height: ${({ height }) => (height ? height : '100%')};
  max-width: 500px;
`;

export const formHandler = (target: HTMLFormElement) => {
  const data = new FormData(target);
  const obj: Record<string, string> = {};
  for (let [key, value] of data.entries()) {
    if (typeof value === 'string') {
      obj[key] = value;
    } else if (value instanceof File) {
      obj[key] = `File: ` + value.name;
    }
  }
  return { ...obj };
};

const Form = ({ children, onSubmit, ref, ...rest }: FormProps) => {
  return (
    <FormContainer onSubmit={onSubmit} ref={ref} {...rest}>
      {children}
    </FormContainer>
  );
};

export default Form;
