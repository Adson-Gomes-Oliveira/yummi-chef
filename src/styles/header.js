import styled from 'styled-components';

export const MainHeader = styled.header`
  display: flex;
  flex-direction: column;
`;

export const FirstSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 5px 15px 0;

  img {
    &:first-of-type {
      color: var(--base-color);
    }
  }
`;

export const MainLogo = styled.div`
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: center;
  width: 150px;

  h2 {
    color: var(--base-color);
    font-family: leChant , sans-serif;
    font-size: 3rem;
    margin: 0;
    margin-right: var(--spacing-scale-1x);
  }

  img {
    position: relative;
    top: -8px;
    width: 45px;
  }
`;

export const SecondSection = styled.div`
  border-bottom: 3px solid var(--base-color);
  border-top: 3px solid var(--base-color);
  display: flex;
  flex-direction: column;
  height: 140px;
  justify-content: space-between;
  padding: 20px 15px 10px;

  input {
    &:first-of-type {
      border: 2px solid var(--base-color);
      border-radius: 5px;
    }
  }

  div {
    &:first-of-type {
      display: flex;
      justify-content: space-between;
    }
  }

  button {
    background-color: var(--base-color);
    border: none;
    color: white;
    font-family: bebas , sans-serif;
    padding: 5px;
    width: 100px;
  }
`;
