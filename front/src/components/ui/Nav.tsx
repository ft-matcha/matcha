import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface NavProps {
  height?: string;
  background?: string;
  children?: React.ReactNode;
}

export const NavContainer = styled.nav<NavProps>`
  display: flex;
  gap: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  min-width: 325px;
  background: ${({ background, theme }) => (background ? background : theme.background)};
  max-width: 375px;
  line-height: 100px;
  height: 100px;
`;

export const NavRow = styled.section<NavProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background: ${({ background }) => (background ? background : 'transparent')};
`;

export const NavItem = styled(NavLink)<NavProps>`
  width: 80%;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  border-radius: 5px;
  text-align: start;
  align-items: center;
  .active {
    background: ${({ theme }) => theme.backgroundHover};
  }
  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
  }
`;

export const NavButton = styled(NavItem).attrs({ as: 'button' })``;

const Nav: React.FC<NavProps> = ({ children, ...rest }) => {
  return <NavContainer {...rest}>{children}</NavContainer>;
};

export default Nav;
