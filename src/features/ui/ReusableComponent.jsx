/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      const queryParams = new URLSearchParams();
      queryParams.set('componentType', componentType);
      const queryString = queryParams.toString();
      navigate(`${id}?${queryString}`);
    }
  };
  if (componentType === 'div') {
    return (
      <div style={styles} onClick={handleClick}>
        {children &&
          children.length > 0 &&
          children.map((child, index) => {
            return (
              <ReusableComponent
                key={index}
                {...child}
                isEditing={isEditing}
              />
            );
          })}
      </div>
    );
  }

  if (componentType === 'button')
    return (
      <button style={styles} onClick={handleClick}>
        {innerText}
      </button>
    );
}
