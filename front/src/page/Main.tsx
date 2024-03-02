import Post, { PostTabContainer } from '@/page/Post';
import Nav from '@/components/ui/Nav';
import { ModalContext } from '@/provider/ModalProvider';
import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Aside from '@/components/ui/Aside';
import { CgProfile } from 'react-icons/cg';
import Profile from './user/Profile';
import Card, { CardBody, CardFooter, CardHeader } from '@/components/ui/Card';

const Layout = styled.section`
  display: grid;
  grid-template-columns: minmax(320px, 375px) 4fr;
  grid-template-areas: 'aside main';
  width: 100%;
  min-height: 100%;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    display: flex;
  }
`;

const MainSection = styled.main`
  grid-area: 'main';
`;

const Main = () => {
  const { setModal } = useContext(ModalContext);
  const [activePage, setActivePage] = useState('');

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
              <Nav.Row>
                <CgProfile />
                <span>프로필</span>
              </Nav.Row>
            </Nav.Item>
            <Nav.Row float="right">
              <Nav.Item
                to=""
                className={({ isActive }) => (isActive ? 'actived' : 'pending')}
                onClick={() => setActivePage('profile')}
              >
                ..
              </Nav.Item>
              <Nav.Item
                to=""
                className={({ isActive }) => (isActive ? 'actived' : 'pending')}
                onClick={() => setActivePage('test')}
              >
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
                  <Nav.Item to="matching">매치</Nav.Item>
                  <Nav.Item to="message">메시지</Nav.Item>
                </Nav.Row>
              </PostTabContainer>
            </Post>
          </Nav.Row>
          <Nav.Section>
            <Outlet />
          </Nav.Section>
        </Nav>
      </Aside>
      <MainSection id="main"></MainSection>
    </Layout>
  );
};

export default Main;
