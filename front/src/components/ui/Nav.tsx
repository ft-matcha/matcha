import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext } from '@/provider/ModalProvider';
import { useContext } from 'react';

const NavContainer = styled.nav<{ gridarea: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  gridarea: ${({ gridarea }) => (gridarea ? gridarea : 'nav')};
  padding-top: 15px;
`;

const NavItem = styled(NavLink)`
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

const NavButton = styled(NavItem).attrs({ as: 'button' })``;

const Nav = ({ gridArea }: { gridArea: string }) => {
  const { setModal } = useContext(ModalContext);
  return (
    <NavContainer gridarea={gridArea}>
      <NavItem to="profile" className={({ isActive }) => (isActive ? 'actived' : 'pending')}>
        profile
      </NavItem>
      <NavItem to="recommend" className={({ isActive }) => (isActive ? 'actived' : 'pending')}>
        recommend
      </NavItem>
      <NavButton
        to=""
        onClick={() => {
          setModal((modalProp: { modalType: string; toggle: boolean }) => ({
            modalType: 'loginModal',
            toggle: true,
          }));
        }}
      >
        Login
      </NavButton>
    </NavContainer>
  );
};

export default Nav;
