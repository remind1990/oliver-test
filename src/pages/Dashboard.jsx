import styled from 'styled-components';
import Sidebar from '../features/ui/SideBar';
import Result from '../features/ui/Result';
import { useState } from 'react';
const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: 22rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

export default function Dashboard() {
  const [showSideBar, setShowSideBar] = useState(true);
  return (
    <StyledDashboard>
      {showSideBar && (
        <Sidebar
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
        />
      )}
      <Result />
    </StyledDashboard>
  );
}
