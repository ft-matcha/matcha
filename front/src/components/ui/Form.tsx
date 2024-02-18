import styled from 'styled-components';

interface FormProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  onSubmit?: (props: any) => any;
}

const FormContainer = styled.form<FormProps>`
  width: ${({ width }) => (width ? width : '300px')};
  height: ${({ height }) => (height ? height : '100%')};
`;

export const formHandler = (target: HTMLFormElement) => {
  const data = new FormData(target);
  const obj: Record<string, FormDataEntryValue> = {};
  for (let [key, value] of data.entries()) {
    if (value) {
      obj[key] = value;
    }
  }
  return obj;
};

const Form: React.FC<FormProps> = ({ children, onSubmit, ...rest }) => {
  return (
    <FormContainer onSubmit={onSubmit} {...rest}>
      {children}
    </FormContainer>
  );
};

export default Form;
