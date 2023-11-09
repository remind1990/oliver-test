import React from 'react'
import styled from 'styled-components'
import ListOfSections from './ListOfSections'
import { useSelector } from 'react-redux';

const StyledDragingSection = styled.div`
  grid-column: 3;
  grid-row: 1/2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-grey-100);
  min-height: 300px;
`
export default function DraginSections() {
  const sections = useSelector((state) => state.components.sections);
  return (
    <StyledDragingSection>
      <h3>Sections:</h3>
   
     <ListOfSections sections={sections}/>
    </StyledDragingSection>
 
  )
}
