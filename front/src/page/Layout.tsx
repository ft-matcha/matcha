import Post, { PostTabContainer } from '@/page/Post';
import Nav from '@/components/ui/Nav';
import { useContext,  useEffect,  useState } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import Aside from '@/components/ui/Aside';
import { CgProfile } from 'react-icons/cg';
import { ApiContainers } from '@/provider/ApiContainerProvider';

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

const Layout = () => {
  const [post, setPost] = useState('');
  const [profile, setProfile] = useState({
	image: "",
	lastName: "",
	firstName: "",
  })

  const api = useContext(ApiContainers);
  useEffect(() => {
	const response = api.call('get', 'user');
	console.log(response);
  }, []);

  return (
    <LayoutDefault>
      <Aside>
        <Nav>
          <Nav.Row background="rgba(24,132, 23, 0.2)" height="100px">
            <Nav.List>
              <Nav.Item
                to="profile"
                className={({ isActive }) => (isActive ? 'actived' : 'pending')}
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
      <MainSection id="main"></MainSection>
    </LayoutDefault>
  );
};

export default Layout;
