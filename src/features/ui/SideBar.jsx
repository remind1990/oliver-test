import styled from 'styled-components';
import Form from './Form';

const StyledSidebar = styled.aside`
  grid-row: 1/ -1;
  background-color: var(--color-grey-100);
  padding: 1.2rem 1.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Form />
    </StyledSidebar>
  );
}
