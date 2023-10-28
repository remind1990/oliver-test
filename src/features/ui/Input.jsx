import styled, { css } from 'styled-components';

const variations = {
  padding: css`
    width: 30px;
    height: 20px;
    background-color: var(--color-grey-100);
    border-color: var(--color-grey-700);
    font-size: medium;
    font-weight: 400;

    &:hover {
      background-color: var(--color-grey-300);
    }
  `,
};
const Input = styled.input`
  border: 1px solid #fff3;
  background-color: #fff7;
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  font-size: large;
  padding: 0.2rem 0.5rem;
  box-shadow: var(--shadow-sm);
  color: inherit;
  ${(props) => variations[props.variation]}
`;
Input.defaultProps = {
  variation: '',
  size: '',
};

const InputContainer = styled.div`
  position: relative;

  &::after {
    content: 'px';
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-110%);
    color: inherit;
  }
`;

const ColorInput = styled.input`
  width: 30px;
  height: 30px;
`;

export { Input, InputContainer, ColorInput };
