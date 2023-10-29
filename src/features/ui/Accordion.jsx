import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AccordionSection = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const AccordionButton = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
`;

const AccordionContent = styled.div`
  overflow: hidden;
  padding: 0 10px;
  transition: all 0.3s;
  max-height: ${(props) => (props.isOpen ? '1000px' : '0')};
`;

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setIsOpen(false);
    }
  }, []);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionSection>
      <AccordionButton onClick={toggleAccordion}>
        {title} {isOpen ? '▲' : '▼'}
      </AccordionButton>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </AccordionSection>
  );
};

export default Accordion;
