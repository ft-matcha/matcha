import styled from 'styled-components';

interface FormProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  onSubmit?: (props: any) => any;
}

const FormContainer = styled.form<FormProps>`
  width: ${({ width }) => (width ? width : '300px')};
`;

const Form: React.FC<FormProps> = ({ children, onSubmit, ...rest }) => {
  return (
    <FormContainer onSubmit={onSubmit} {...rest}>
      {children}
    </FormContainer>
  );
};

export default Form;
