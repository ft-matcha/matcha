import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100%;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

function App() {
  return (
    <>
      <Container>
		<Outlet/>
      </Container>
    </>
  );
}

export default App;
