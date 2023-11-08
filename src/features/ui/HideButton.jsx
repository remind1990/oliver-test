import styled from 'styled-components';

const HideButton = styled.button`
  display: none;

  @media (max-width: 767px) {
    display: block;
    width: fit-content;
    position: absolute;
    right: 0;
  }
`;

export default HideButton;
