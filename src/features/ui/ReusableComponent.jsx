/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledReusableComponent = styled.div`
  display: ${(props) => props.display};
  ${(props) =>
    props.display === 'flex' &&
    css`
      flex-wrap: wrap;
    `}
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: ${(props) => props.position};
  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
  padding: ${(props) =>
    `${props.padding.top}px ${props.padding.right}px ${props.padding.bottom}px ${props.padding.left}px`};
  margin: ${(props) =>
    `${props.margin.top}px ${props.margin.right}px ${props.margin.bottom}px ${props.margin.left}px`};
  box-sizing: border-box;
`;

export default function ReusableComponent({
  id,
  componentType,
  width,
  height,
  backgroundColor,
  textColor,
  padding,
  margin,
  display,
  position,
  children,
  innerText,
  isEditing,
}) {
  const navigate = useNavigate();
  const [childrenWithData, setChildrenWithData] = useState([]);
  const allComponents = useSelector(
    (state) => state.components.components
  );
  useEffect(() => {
    if (!children || children.length === 0) return;
    const arrayOfChildrenWithData = allComponents.filter(
      (component) => children.includes(component.id)
    );
    setChildrenWithData(arrayOfChildrenWithData);
  }, [allComponents, children]);

  const styles = {
    display,
    width: width + 'px',
    height: height + 'px',
    position,
    backgroundColor,
    color: textColor,
    padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
    margin: `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`,
    boxSizing: 'border-box',
  };
  const handleClick = (e) => {
    if (isEditing) {
      e.preventDefault();
    } else {
      e.stopPropagation();
      navigate(id);
    }
  };

  if (componentType === 'div') {
    return (
      <StyledReusableComponent
        display={display}
        width={width}
        height={height}
        position={position}
        backgroundcolor={backgroundColor}
        color={textColor}
        padding={padding}
        margin={margin}
        onClick={handleClick}
      >
        {childrenWithData.length > 0 &&
          childrenWithData.map((child, index) => {
            return (
              <ReusableComponent
                key={index}
                {...child}
                isEditing={isEditing}
              />
            );
          })}
      </StyledReusableComponent>
    );
  }

  if (componentType === 'button')
    return (
      <StyledReusableComponent
        as="button"
        display={display}
        width={width}
        height={height}
        position={position}
        backgroundcolor={backgroundColor}
        color={textColor}
        padding={padding}
        margin={margin}
        style={styles}
        onClick={handleClick}
      >
        {innerText}
      </StyledReusableComponent>
    );
}
