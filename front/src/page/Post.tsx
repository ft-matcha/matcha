import styled from 'styled-components';
import { FaBell } from 'react-icons/fa';
import { CiBellOff } from 'react-icons/ci';
import { StyledProfile } from '@/page/user/Profile';
import { NavLink } from 'react-router-dom';
import DropDown from '@/components/ui/DropDown';

const PostContainer = styled.section<{ gridArea?: string }>`
  margin-top: 15px;
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
  display: grid;
  position: sticky;
  top: 0;
  height: 42px;
  line-height: 42px;
  opacity: 1;
  border-bottom: 1px solid;
  margin: -1px 0 0 -1px;
  width: calc(100% - 1px);
  grid-template-columns: 1fr 1fr 42px;
  background: ${({ theme }) => theme.background};
`;

const PostTab = styled(NavLink)`
  display: grid;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 32px;
  line-height: 32px;
  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
    color: ${({ theme }) => theme.colorHover};
  }
`;

const PostBody = styled.section`
  display: flex;
  justify-content: center;
  width: calc(100% - 1px);
  margin-top: 40px;
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
          <DropDown openElement={<FaBell />} closeElement={<CiBellOff />}>
            <ul>
              <li>hi</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
            </ul>
          </DropDown>
        </PostTabContainer>
        <PostBody>{children}</PostBody>
      </PostContainer>
    </>
  );
};

export default Post;
