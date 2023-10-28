import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  width: 100vw;
  padding: 1rem;
  margin: 0 auto;
  overflow-y: auto;
`;

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <main>
        <Outlet />
      </main>
    </StyledAppLayout>
  );
}
