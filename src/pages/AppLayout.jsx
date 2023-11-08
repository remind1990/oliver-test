import { motion } from 'framer-motion';
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
const AnimatedAppLayout = motion(StyledAppLayout);
export default function AppLayout() {
  return (
    <AnimatedAppLayout
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Main>
        <Outlet />
      </Main>
    </AnimatedAppLayout>
  );
}
