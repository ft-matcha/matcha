import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

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
  useEffect(() => {
    const handleScroll = (e: any) => {
      e.preventDefault();
      window.scrollTo(0, window.scrollY + e.deltaY);
      if (e.deltaX > 20) {
        console.log('will be next page');
      } else if (e.deltaX < -20) {
        console.log('will be previous page');
      }
    };
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
