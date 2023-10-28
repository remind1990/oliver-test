import styled from 'styled-components';

const VerticalFormRow = styled.div`
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  gap: 0.2rem;
`;
const HorizontalFormRow = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  justify-content: space-between;
`;

export { VerticalFormRow, HorizontalFormRow };
