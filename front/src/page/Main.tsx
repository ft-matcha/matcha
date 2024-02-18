import Post from '@/components/Post';
import { Outlet } from 'react-router';

const Main = () => {
  return (
    <>
      <Post>
        <Outlet />
      </Post>
    </>
  );
};

export default Main;
