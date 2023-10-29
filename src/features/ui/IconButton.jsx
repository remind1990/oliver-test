import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
`;

const IconButton = ({
  width,
  height,
  text,
  icon,
  iconSize,
  onClick,
}) => {
  return (
    <StyledButton width={width} height={height} onClick={onClick}>
      {text}
      <span style={{ fontSize: iconSize, marginLeft: '5px' }}>
        {icon}
      </span>
    </StyledButton>
  );
};

export default IconButton;
