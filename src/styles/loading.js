import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const LoadingProgress = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fade} ease 0.5s;
  top: 0;
  left: 0;
  background-color: var(--base-color);
  width: 100%;
  height: 100vh;
  z-index: 1;
`;

export const LoadingArt = styled.span`
  color: white;
  font-size: 5rem;
  animation: ${rotate} 2s linear infinite;
`;

export const LoadingQuotes = styled.q`
  color: white;
  padding: 15px;
  text-align: center;
  font-family: bebas , sans-serif;
  font-size: 1.5rem;
`;

export const LoadingLogo = styled.img`
  position: absolute;
  color: white;
  width: 100%;
  opacity: 10%;
`;
