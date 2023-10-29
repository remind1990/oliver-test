import styled from 'styled-components';
import Form from './Form';
import Heading from './Heading';

const StyledSidebar = styled.aside`
  grid-row: 1/ -1;
  background-color: var(--color-grey-100);
  padding: 1.2rem 1.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: fit-content;
  @media (max-width: 767px) {
    overflow: auto;
    overflow-y: auto;
    flex-basis: 50%;
  }
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Heading>create new section</Heading>
      <Form />
    </StyledSidebar>
  );
}
