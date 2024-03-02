import styled from 'styled-components';

const StyledAside = styled.aside`
  display: grid;
  grid-template-rows: 100px auto;
  gap: 5px;
  height: 100%;
  border-right: 1px solid gray;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Aside = ({ children }: { children?: React.ReactNode }) => {
  return <StyledAside>{children}</StyledAside>;
};

export default Aside;
