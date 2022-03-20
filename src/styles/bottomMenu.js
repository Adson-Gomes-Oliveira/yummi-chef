import styled from 'styled-components';

const bottomMenuStyled = styled.section`
  bottom: 0;
  height: 9vh;
  position: fixed;
  width: 100%;

  .menu-icons {
    align-items: center;
    background-color: var(--base-color);
    display: flex;
    height: 100%;
    justify-content: space-around;
  }

  img {
    width: 70%;
  }

  a {
    display: flex;
    justify-content: center;
  }
`;

export default bottomMenuStyled;
