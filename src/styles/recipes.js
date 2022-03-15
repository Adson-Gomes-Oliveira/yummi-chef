import styled from 'styled-components';

export const RecipesContainer = styled.section`
  bottom: 5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
`;

export const Carousel = styled.div`
  align-items: center;
  background-color: yellow;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: var(--spacing-scale-3x) 20px;

  span {
    margin: 0 45px;
    margin-top: 20px;
    width: 100px;

    &:first-of-type { margin-left: 0; }
    &:last-of-type { margin-right: 30px; }
  }

  img { 
    width: 130px; 
  }
`;
