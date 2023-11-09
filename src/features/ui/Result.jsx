import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ReusableComponent from './ReusableComponent';

const StyledResult = styled.section`
  grid-column: ${(props) => (props.editing ? '2' : '1/4')};
  grid-row: 1/2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin: 5rem 0;
  @media (max-width: 767px) {
    width: 100%;
    overflow: auto;
    overflow-y: auto;
    flex-basis: 50%;
  }
`;

export default function Result({showEditTools}) {
  const components = useSelector(
    (state) => state.components.sections
  );
  return (
    <StyledResult editing={showEditTools}>
      {components.length > 0 &&
        components.map((component) => (
          <ReusableComponent
            {...component}
            key={component.id}
          ></ReusableComponent>
        ))}
    </StyledResult>
  );
}
