/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  white-space: pre-line;
  overflow: hidden;
  border-right: 3px solid transparent;
  max-width: 55rem;
  text-align: center;
`;

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [text]);

  return <StyledH1>{displayText}</StyledH1>;
};

export default TypewriterText;
