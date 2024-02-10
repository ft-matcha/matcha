import styled from 'styled-components';
import Card, { CardBody, CardFooter, CardHeader } from '@/components/ui/Card';
import { useState } from 'react';
import CardList from '@/components/CardList';
import { StyledButton } from '@/components/ui/Button';

const PostContainer = styled.section`
  min-height: 200px;
  width: 100%;
  max-width: 100%;
  height: fit-content;
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
  z-index: 1000;
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

const PostTab = styled(StyledButton)`
  display: grid;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 32px;
  line-height: 100%;
  color: ${({ theme }) => theme.color};
  &:first-child {
    border-right: 1px solid;
  }
  &::hover {
    background-color: red;
    transition: all 1s;
  }
`;

const PostBody = styled.section`
  width: calc(100% - 1px);
  div {
    width: 100%;
    border-top: 1px solid;
    margin: -1px 0 0 -1px;
    &: first-child {
      border-top: 0px;
    }
  }
`;
const test = [
  { header: 'test', body: 'test1_data 어떤게 실행되는 거예요?' },
  { header: 'test', body: 'test1_data 이게 실행되는 거예요?' },
];
const test2 = [
  { header: 'test2222222222222', body: 'test2_data 어떤게 실행되는 거예요?' },
  { header: 'test2222222222222', body: 'test2_data 어떤게 실행되는 거예요?' },
  { header: 'test2222222222222', body: 'test2_data 어떤게 실행되는 거예요?' },
  { header: 'test2222222222222', body: 'test2_data 이게 실행되는 거예요?' },
  { header: 'test2222222222222', body: 'test2_data 이게 실행되는 거예요?' },
  { header: 'test2222222222222', body: 'test2_data 이게 실행되는 거예요?' },
];

const Post = () => {
  const [tab, setTab] = useState(false);

  return (
    <>
      <PostContainer>
        <PostTabContainer>
          <PostTab onClick={() => setTab(false)}>first</PostTab>
          <PostTab onClick={() => setTab(true)}>second</PostTab>
        </PostTabContainer>
        <PostBody>
          <CardList data={tab ? test : test2} />
        </PostBody>
      </PostContainer>
    </>
  );
};

export default Post;
