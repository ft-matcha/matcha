import Post, { PostTabContainer } from '@/page/Post';
import Nav from '@/components/ui/Nav';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Aside from '@/components/ui/Aside';
import { CgProfile } from 'react-icons/cg';
import { deleteToken } from '@/utils/token';
import useApi from '@/hooks/useApi';
import { FaUserFriends } from 'react-icons/fa';
import useKakao from '@/hooks/useKakao';
import { useEffect, useRef, useState } from 'react';
import Span from '@/components/ui/Span';
import { useNavigate } from 'react-router-dom';
import RecommendCard from '@/page/recommend/RecommendCard';

const LayoutDefault = styled.section`
  display: grid;
  grid-template-columns: minmax(320px, 375px) 4fr;
  grid-template-areas: 'aside main';
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 100%;
    grid-template-areas: 'aside';
  }
`;

const MainSection = styled.main`
  grid-area: main;
  height: 100%;
  @media screen and (max-width: 768px) {
  }
`;

const MobileLayout = () => {
  return (
    <>
      <div>
        <FaUserFriends fontSize={'32px'} />
      </div>
    </>
  );
};

const DesktopLayout = (props: any) => {
  const api = useApi();
  const navigator = useNavigate();
  const [profile, setProfile] = useState({ id: '', firstName: '', lastName: '', address: '' });
  const fetchApi = async () => {
    try {
      const { data } = await api('get', 'user');
      setProfile(data);
    } catch {
      console.error('..');
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Aside>
        <Nav>
          <Nav.Row background="rgba(24,132, 23, 0.2)" height="100px">
            <Nav.List float="space-between" width="100%">
              <Nav.Item
                to="/profile"
                className={({ isActive }) => (isActive ? 'actived' : 'pending')}
                width={'fit-content'}
              >
                <CgProfile />
                <Span border={'0px'} value={profile?.firstName + profile?.lastName} />
              </Nav.Item>
              <Nav.Item
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  deleteToken('accessToken');
                  navigator('/');
                }}
                width={'fit-content'}
              >
                Logout
              </Nav.Item>
            </Nav.List>
          </Nav.Row>
        </Nav>
        <Nav>
          <Nav.Row>
            <Post>
              <PostTabContainer>
                <Nav.Row height="auto">
                  <Nav.List>
                    <Nav.Item as="button" to="">
                      DM
                    </Nav.Item>
                  </Nav.List>
                  <Nav.List>
                    <Nav.Item
                      to="/explorer/recommend"
                      className={({ isActive }) => (isActive ? 'actived' : 'pending')}
                    >
                      추천
                    </Nav.Item>
                  </Nav.List>
                </Nav.Row>
              </PostTabContainer>
            </Post>
          </Nav.Row>
          <Nav.Section id="nav-section">
            <Outlet />
          </Nav.Section>
        </Nav>
      </Aside>
      <MainSection id="main">
        <RecommendCard
          profileList={[
            'https://i.namu.wiki/i/v9mjVvN1z88ez3EY_ECy3CIHXuaCmMicz_awziQW7Na5lluUpBwLMTb_2RluVPuDAjAwzazdBzSm0wLOhdJNmw.webp',
            'https://i.namu.wiki/i/JQQdOENy3aGlgcFmecRY5D7iIWDhyS5xIB1A2Tck_28Z792LbybVgWidMlKFyJZj-OlV6TUIIbkronpdJFSNBA.webp',
            'https://i.namu.wiki/i/PHPaxu5UjnztUXHx5OHKnYH615-z4-IFOuBSunSxPahvTCbI2JgYKQfW3j8JEEBiXEOaB40SuVLIiw3rXHeGyQ.webp',
          ]}
        />
      </MainSection>
    </>
  );
};

const Layout = () => {
  return (
    <LayoutDefault>
      <DesktopLayout />
    </LayoutDefault>
  );
};

export default Layout;
