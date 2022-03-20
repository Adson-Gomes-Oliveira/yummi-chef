import styled from 'styled-components';

export const RecipesContainer = styled.section`

`;

export const Carousel = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 15px 15px;
  gap: 2rem;

  div {
    margin: 0 10px;
    margin-top: 20px;

    &:first-of-type { margin-left: 0; }
    &:last-of-type { margin-right: 30px; }
  }

  img {
    width: 130px;
  }
`;

export const CarouselItem = styled.div`
  background-color: var(--base-color);
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 200px;
  border-radius: 10px;

  img {
    border-radius: 10px 10px 0 0;
    width: 150px;
  }

  span {
    background-color: white;
    font-family: bebas , sans-serif;
    color: var(--base-color);
    font-size: 1.5rem;
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
    color: var(--base-color);
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

    label {
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
