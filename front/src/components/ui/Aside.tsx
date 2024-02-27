import styled from 'styled-components';

const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  min-height: 100%;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Aside = ({ children }: { children: React.ReactNode }) => {
  return <StyledAside>{children}</StyledAside>;
};

export default Aside;
