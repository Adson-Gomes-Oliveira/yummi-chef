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

  button {
    background: none;
    border: none;
    padding: 0;
  }
`;

export const MainLogo = styled.div`
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: space-between;
  width: ${(props) => {
    if (props.size === undefined) {
      return '9.5rem';
    }
    return props.size;
  }};;

  h2 {
    color: var(--base-color);
    font-family: leChant , sans-serif;
    font-size: ${(props) => {
    if (props.fontSize === undefined) {
      return '3rem';
    }
    return props.fontSize;
  }};
    margin: 0;
    margin-right: var(--spacing-scale-1x);
  }

  img {
    position: relative;
    top: -8px;
     width: ${(props) => {
    if (props.logoSize === undefined) {
      return '2.81rem';
    }
    return props.logoSize;
  }};
  }
`;

export const HeaderIcons = styled.span`
  color: var(--base-color);
  font-size: 2.12rem;
`;

export const SecondSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchArea = styled.div`
  border-bottom: 3px solid var(--base-color);
  border-top: 3px solid var(--base-color);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 150px;
  padding: 15px 10px 10px;
  position: absolute;
  top: 75px;
`;

export const InputSearch = styled.input`
  border: 2px solid var(--base-color);
  border-radius: 5px;
  height: 40px;
  padding: 0 10px;
`;

export const FormRadio = styled.form`
  display: flex;
  justify-content: space-between;
  font-family: bebas , sans-serif;

  input {
    
  }

  span {
    margin-left: 5px;
  }
`;
