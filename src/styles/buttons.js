import styled from 'styled-components';

export const ButtonRecipe = styled.button`
  background-color: ${(props) => {
    if (props.btnType === 'continue') { return 'var(--button-alternative-color)'; }
    if (props.btnType === 'finish') { return 'var(--base-color)'; }
  }};
  border: none;
  bottom: 0;
  color: white;
  font-family: bebas , sans-serif;
  font-size: var(--spacing-scale-4x);
  padding: var(--spacing-scale-3x);
  position: fixed;
  width: 100%;
  z-index: 2;

  &:disabled {
    background-color: var(--body-color);
  }
`;

export const ButtonSearch = styled.button`
  background-color: var(--base-color);
  border: none;
  color: white;
  font-family: bebas , sans-serif;
  padding: 6px;
  width: 130px;
  font-size: 18px;
`;
