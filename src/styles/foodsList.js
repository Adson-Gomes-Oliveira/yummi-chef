import styled from 'styled-components';

export const ListFoodsStyles = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
`;

export const ButtonsDivStyled = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-bottom: 1.25rem;
    
    button {
        background-color: var(--base-color);
        margin: 0.25rem 0.15rem;
        padding: var(--spacing-scale-2x) 0;
        border: none;
        border-radius: 10px;
        color: white;
        font-family: bebas, sans-serif;
        font-size: 1.1rem;
        min-width: 7rem;
        max-width: 7rem;
    }

    button:first-of-type {
        margin-left: 0.21rem;
    }
`;

export const FoodCard = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    div {

        display: flex;
        justify-content: center;
        width: 9rem;
        margin: var(--spacing-scale-2x) var(--spacing-scale-3x);
        border: 1px solid var(--base-color);
        border-bottom: 7px solid var(--base-color);
        border-radius: 13px;

    h5 {
        margin: 0;
        margin-top: 4px;
        font-size: 1.5rem;
        font-family: bebas;
        color: var(--base-color);
        text-align: center;
    }

    img {
        width: 100%;
        border-radius: 11px;
    }
    }
`;
