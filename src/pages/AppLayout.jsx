import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  width: 100vw;
  padding: 1rem;
  margin: 0 auto;
  overflow-y: auto;
`;
const Main = styled.div`
  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}
