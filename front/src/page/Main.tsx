import Post from '@/page/Post';
import Nav, { NavButton, NavItem } from '@/components/ui/Nav';
import { ModalContext } from '@/provider/ModalProvider';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: 'nav main';
`;

const Main = () => {
  const { setModal } = useContext(ModalContext);
  return (
    <Layout>
      <Nav gridArea="nav">
        <NavItem
          to="profile"
          className={({ isActive }) => {
            console.log(isActive);
            return isActive ? 'actived' : 'pending';
          }}
        >
          profile
        </NavItem>
        <NavItem to="recommend" className={({ isActive }) => (isActive ? 'actived' : 'pending')}>
          recommend
        </NavItem>
        <NavButton
          to=""
          onClick={() => {
            setModal(() => ({
              modalType: 'loginModal',
              toggle: true,
            }));
          }}
        >
          Login
        </NavButton>
      </Nav>
      <Post>
        <Outlet />
      </Post>
    </Layout>
  );
};

export default Main;
