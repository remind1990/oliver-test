import styled from 'styled-components';

const CloseButton = styled.button`
  width: fit-content;
  background: transparent;
  padding: 0;
  font-size: 2rem;
  position: absolute;
  top: 0;
  left: 0;

  &:hover {
    border: '1px solid transparent';
    border-color: 'trasparent' !important;
  }
`;

export default CloseButton;
