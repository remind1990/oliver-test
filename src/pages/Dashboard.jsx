import styled from 'styled-components';
import Sidebar from '../features/ui/SideBar';
import Result from '../features/ui/Result';
import { useState } from 'react';
import { motion } from 'framer-motion';
import DraginSections from '../features/ui/DragingSections';
import Header from '../features/ui/Header';
const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: 22rem 1fr auto;
  grid-template-rows: auto 1fr;
  height: 100vh;
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    gap: 2rem;
    overflow-y: scroll;
  }
`;
const AnimatedDashboard = motion(StyledDashboard);
export default function Dashboard() {
  const [showEditTools, setShowEditTools] = useState(true);
  return (
    <AnimatedDashboard
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
      transition: { duration: 1, delay: 0.5 },
    }}
    exit={{
      opacity: 0,
    }}
    >
      {showEditTools && (
        <>
        <Sidebar
        />
      
      
      <DraginSections/>
      </>
      )}
      <Header showEditTools={showEditTools} setShowEditTools={setShowEditTools}/>
      <Result showEditTools={showEditTools}/>
      
    </AnimatedDashboard>
  );
}
