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
  border: 1px solid transparent;
  transition: all 0.3s;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.5s;
  }
  ${(props) =>
    props.editing === 'false' &&
    css`
      &:hover {
        border: 2px dashed;
        border-color: var(
          --color-grey-400
        ); /* Use proper property name */
        transform: scale(1.1);
        position: relative;
        &::before {
          content: '📝';
          opacity: 1;
        }
      }
    `};
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
        editing={isEditing ? 'true' : 'false'}
      >
        {innerText && <p>{innerText}</p>}
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
        isEditing={isEditing}
        onClick={handleClick}
      >
        {innerText ? innerText : componentType}
      </StyledReusableComponent>
    );
}
