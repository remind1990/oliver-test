import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReusableComponent from './ReusableComponent';

const StyledResult = styled.section`
  width: 90%;
  margin: 0 auto;
`;

export default function Result() {
  const components = useSelector(
    (state) => state.components.sections
  );
  return (
    <StyledResult>
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
