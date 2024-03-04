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
  const [post, setPost] = useState('');

  return (
    <Layout>
      <Aside>
        <Nav>
          <Nav.Row background="rgba(24,132, 23, 0.2)" height="100px">
            <Nav.List>
              <Nav.Item
                to="profile"
                className={({ isActive }) => {
                  console.log(isActive);
                  return isActive ? 'actived' : 'pending';
                }}
              >
                <CgProfile />
                <span>프로필</span>
              </Nav.Item>
            </Nav.List>
          </Nav.Row>
        </Nav>
        <Nav>
          <Nav.Row>
            <Post>
              <PostTabContainer>
                <Nav.Row>
                  <Nav.List>
                    <Nav.Item
                      as="Button"
                      to=""
                      onClick={(e) => {
                        e.preventDefault();
                        if (post !== 'match') {
                          setPost('match');
                        } else {
                          setPost('');
                        }
                      }}
                    >
                      매치
                    </Nav.Item>
                  </Nav.List>
                  <Nav.List>
                    <Nav.Item
                      as="Button"
                      to=""
                      onClick={(e) => {
                        e.preventDefault();
                        if (post !== 'message') {
                          setPost('message');
                        } else {
                          setPost('');
                        }
                      }}
                    >
                      메시지
                    </Nav.Item>
                  </Nav.List>
                </Nav.Row>
              </PostTabContainer>
            </Post>
          </Nav.Row>
          <Nav.Section>{post === '' ? <Outlet /> : <>test</>}</Nav.Section>
        </Nav>
      </Aside>
      <MainSection id="main">{post !== '' && <Outlet />}</MainSection>
    </Layout>
  );
};

export default Main;
