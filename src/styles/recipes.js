import styled from 'styled-components';

export const RecipesContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
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

export const BackgroundRecipe = styled.div`
  background: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: 10%;
  height: 30vh;
`;

export const HeadingRecipe = styled.div`
  display: flex;
  justify-content: space-between;
  margin: var(--spacing-scale-3x);
`;

export const HeadingTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeadingButtons = styled.div`
  display: flex;
  margin-top: var(--spacing-scale-2x);

  button {
    background-color: white;
    border: none
  }

  span {
    font-size: 2rem;
  }
`;

export const SideBySideList = styled.ul`
  background-color: var(--body-color);
  display: flex;
  flex-flow: row;
  list-style: none;
  padding: 0;

  div {
    display: flex;
    flex-direction: column;
    width: 100%;

    li {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid white;
      width: 100%;
      padding: 10px;
    }

    &:first-of-type {
      border-right: 1px solid white;
    }
  }
`;

export const Paragraph = styled.p`
  padding: 15px;
`;
