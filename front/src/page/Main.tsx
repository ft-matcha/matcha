import Post, { PostTabContainer } from '@/page/Post';
import Nav from '@/components/ui/Nav';
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
        <Nav>
          <Nav.Row background="rgba(24,132, 23, 0.2)" height="100px">
            <Nav.Item
              to="profile"
              className={({ isActive }) => {
                console.log(isActive);
                return isActive ? 'actived' : 'pending';
              }}
            >
              .
            </Nav.Item>
            <Nav.Row float="right">
              <Nav.Item to="" className={({ isActive }) => (isActive ? 'actived' : 'pending')}>
                ..
              </Nav.Item>
              <Nav.Item to="" className={({ isActive }) => (isActive ? 'actived' : 'pending')}>
                ...
              </Nav.Item>
            </Nav.Row>
          </Nav.Row>
        </Nav>
        <Nav>
          <Nav.Row>
            <Post>
              <PostTabContainer>
                <Nav.Row>
                  <Nav.Item to="active">매치</Nav.Item>
                  <Nav.Item to="">메시지</Nav.Item>
                </Nav.Row>
              </PostTabContainer>
            </Post>
          </Nav.Row>
          <Outlet />
        </Nav>
      </Aside>
      <div style={{ objectFit: 'contain', width: '100%', height: '100%' }}>
        <img src="/cat.jpg" alt="main" />
      </div>
    </Layout>
  );
};

export default Main;
