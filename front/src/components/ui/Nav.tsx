import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav<{ gridarea: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  gridarea: ${({ gridarea }) => (gridarea ? gridarea : 'nav')};
  padding-top: 15px;
`;

export const NavItem = styled(NavLink)`
  width: 80%;
  height: 50px;
  line-height: 50px;
  font-size: 32px;
  border-radius: 5px;
  text-align: start;
  & .actived {
    background: ${({ theme }) => theme.backgroundHover};
  }
  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
  }
`;

export const NavButton = styled(NavItem).attrs({ as: 'button' })``;

const Nav: React.FC<{ gridArea: string; children: React.ReactNode }> = ({ gridArea, children }) => {
  return <NavContainer gridarea={gridArea}>{children}</NavContainer>;
};

export default Nav;
