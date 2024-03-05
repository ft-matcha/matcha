import styled from 'styled-components';
import { StyledProfile } from '@/page/user/Profile';
import { NavLink } from 'react-router-dom';

const PostContainer = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100%;
  justifty-content: center;
  align-items: center;
  .active {
    background: ${({ theme }) => theme.backgroundHover};
    color: ${({ theme }) => theme.colorHover};
  }
`;

export const PostTabContainer = styled.div`
  display: grid;
  position: sticky;
  top: 0;
  height: fit-content;
  line-height: 12px;
  opacity: 1;
  margin: -1px 0 0 -1px;
  width: calc(100% - 1px);
  gap: 5px;
  background: ${({ theme }) => theme.background};
`;

export const PostTab = styled(NavLink)`
  display: grid;
  text-align: center;
  align-items: center;
  height: fit-content;
  width: 100%;
  font-size: 12px;
  line-height: 12px;
  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
    color: ${({ theme }) => theme.colorHover};
  }
`;

const PostBody = styled.section`
  display: flex;
  justify-content: center;
  width: calc(100% - 1px);
  margin: 0px auto;
  align-items: center;
  ${StyledProfile} {
    width: 80%;
    height: fit-content;
  }
`;

const Post = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PostContainer>
        <PostBody>{children}</PostBody>
      </PostContainer>
    </>
  );
};

export default Post;
