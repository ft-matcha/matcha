import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext } from '@/provider/ModalProvider';

const Container = styled.div`
  min-height: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

function App() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
