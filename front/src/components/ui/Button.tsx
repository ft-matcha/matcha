import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  [key: string]: any;
  onClick?: (props: any) => any;
  children?: ReactNode;
  style?: any;
  type?: string;
}

export const StyledButton = styled.button<ButtonProps>`
  type: ${({ type }) => type};
  &:hover {
    background-color: ${({ theme }) => theme.backgroundHover};
    transition: all 0.3s ease-in-out;
  }
`;

const Button: React.FC<ButtonProps> = ({ onClick, children, type, style, ...rest }) => {
  return (
    <StyledButton onClick={onClick} style={style} type={type} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
