import styled from 'styled-components';
import { StyledButton } from '@/components/ui/Button';
import { StyledProfile } from '@/page/user/Profile';
import { NavLink } from 'react-router-dom';

const PostContainer = styled.section<{ gridArea?: string }>`
  min-height: 200px;
  width: 100%;
  max-width: 100%;
  height: fit-content;
  grid-area: ${({ gridArea }) => (gridArea ? gridArea : 'main')};
  .active {
    background: ${({ theme }) => theme.backgroundHover};
    color: ${({ theme }) => theme.colorHover};
  }
  @media screen and (max-width: 768px) {
    max-width: 400px;
  }
  @media screen and (min-width: 768px) {
    width: 700px;
  }
`;

const PostTabContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  height: 80px;
  line-height: 40px;
  flex-direction: row;
  justify-content: center;
  border: 1px solid;
  opacity: 1;
  border-top: 0px;
  margin: -1px 0 0 -1px;
  width: calc(100% - 1px);
  background: ${({ theme }) => theme.background};
`;

const PostTab = styled(NavLink)`
  display: grid;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 32px;
  line-height: 100%;
  &:first-child {
    border-right: 1px solid;
  }
  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
    color: ${({ theme }) => theme.colorHover};
  }
`;

const PostBody = styled.section`
  display: flex;
  justify-content: center;
  width: calc(100% - 1px);
  ${StyledProfile} {
    margin-top: 25px;
    border-top: 1px solid;
  }
`;

const Post = ({ gridArea, children }: { gridArea?: string; children: React.ReactNode }) => {
  return (
    <>
      <PostContainer gridArea={gridArea}>
        <PostTabContainer>
          <PostTab to="recommend" className={({ isActive }) => (isActive ? 'actived' : 'pending')}>
            For you
          </PostTab>
          <PostTab to="other">Following</PostTab>
        </PostTabContainer>
        <PostBody>{children}</PostBody>
      </PostContainer>
    </>
  );
};

export default Post;
