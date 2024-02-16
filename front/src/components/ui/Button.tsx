import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  [key: string]: any;
  onClick?: (props: any) => any;
  children?: ReactNode;
  style?: any;
}

export const StyledButton = styled.button<ButtonProps>`
  &:hover {
    background-color: ${({ theme }) => theme.backgroundHover};
    transition: all 0.3s ease-in-out;
  }
`;

const Button: React.FC<ButtonProps> = ({ onClick, children, style }) => {
  return (
    <StyledButton onClick={onClick} style={style}>
      {children}
    </StyledButton>
  );
};

export default Button;
