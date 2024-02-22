import Post from '@/components/Post';
import Nav from '@/components/ui/Nav';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: 'nav main';
`;

const Main = () => {
  return (
    <Layout>
      <Nav gridArea="nav" />
      <Post>
        <Outlet />
      </Post>
    </Layout>
  );
};

export default Main;
