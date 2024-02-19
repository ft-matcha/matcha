import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav<{ gridArea: string }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  gridarea: ${({ gridArea }) => gridArea};
  padding-top: 15px;
`;

const NavItem = styled(NavLink)`
  width: 80%;
  height: 50px;
  line-height: 50px;
  font-size: 32px;
  border-radius: 5px;
  & .actived {
    background: ${({ theme }) => theme.backgroundHover};
  }
  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
  }
`;

const Nav = ({ gridArea }: { gridArea: string }) => {
  return (
    <NavContainer gridArea={gridArea}>
      <NavItem to="profile" className={({ isActive }) => (isActive ? 'actived' : 'pending')}>
        profile
      </NavItem>
      <NavItem to="recommend" className={({ isActive }) => (isActive ? 'actived' : 'pending')}>
        recommend
      </NavItem>
    </NavContainer>
  );
};

export default Nav;
