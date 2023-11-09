import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'

const StyledHeader = styled.nav`
    grid-row: 1;
    grid-column: ${(props) => (props.editing ? '2' : '1/4')};
    height: fit-content;
    padding: 0.5rem;
    background: var(--color-grey-100);
`
export default function Header({ showEditTools, setShowEditTools}) {
  const components = useSelector(
    (state) => state.components.sections
  );
   const noComponents =  components.length  === 0
  
  return (
    <StyledHeader editing={showEditTools}><button disabled={noComponents} onClick={() => setShowEditTools(state => !state)}>{showEditTools ? 'show result' : 'keep editing'}</button></StyledHeader>
  )
}
