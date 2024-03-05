import styled from 'styled-components';

const StyledAside = styled.aside`
  position: relative;
  display: grid;
  grid-template-rows: 100px auto;
  gap: 5px;
  height: 100%;
  overflow-y: hidden;
  border-right: 1px solid gray;
`;

const Aside = ({ children }: { children?: React.ReactNode }) => {
  return <StyledAside>{children}</StyledAside>;
};

export default Aside;
