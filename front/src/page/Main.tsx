import Post, { PostTabContainer } from '@/page/Post';
import Nav, { NavButton, NavContainer, NavItem, NavRow } from '@/components/ui/Nav';
import { ModalContext } from '@/provider/ModalProvider';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Aside from '@/components/ui/Aside';

const Layout = styled.section`
  display: grid;
  grid-template-columns: minmax(320px, 375px) 4fr;
  width: 100%;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    display: flex;
  }
`;

const Main = () => {
  const { setModal } = useContext(ModalContext);
  return (
    <Layout>
      <Aside>
        <NavContainer>
          <NavRow background="rgba(24,132, 23, 0.2)" height="100px">
            <NavItem
              to="profile"
              height="100px"
              className={({ isActive }) => {
                console.log(isActive);
                return isActive ? 'actived' : 'pending';
              }}
            >
              .
            </NavItem>
            <NavRow>
              <NavItem
                height="100px"
                to="recommend"
                className={({ isActive }) => (isActive ? 'actived' : 'pending')}
              >
                ..
              </NavItem>
              <NavItem
                height="100px"
                to="recommend"
                className={({ isActive }) => (isActive ? 'actived' : 'pending')}
              >
                ...
              </NavItem>
            </NavRow>
          </NavRow>
        </NavContainer>
        <NavContainer>
          <NavRow>
            <Post>
              <PostTabContainer>
                <NavRow height="22px">
                  <NavItem to="active">매치</NavItem>
                  <NavItem to="">메시지</NavItem>
                </NavRow>
              </PostTabContainer>
            </Post>
          </NavRow>
        </NavContainer>
      </Aside>
      <Outlet />
    </Layout>
  );
};

export default Main;
