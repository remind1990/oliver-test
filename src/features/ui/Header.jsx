import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.nav`
    grid-row: 1;
    grid-column: ${(props) => (props.editing ? '2' : '1/4')};
    height: fit-content;
    padding: 0.5rem;
    background: var(--color-grey-100);
`
export default function Header({ showEditTools, setShowEditTools}) {
  
  return (
    <StyledHeader editing={showEditTools}><button onClick={() => setShowEditTools(state => !state)}>{showEditTools ? 'show result' : 'keep editing'}</button></StyledHeader>
  )
}
