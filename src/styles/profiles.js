import styled from 'styled-components';

const ProfileSections = styled.section`
    display: flex;
    justify-content: center;
    text-align: center;
    font-family: bebas , sans-serif;

    span {
        color: var(--base-color);
        font-size: 1.8rem;
        margin: 2.5rem;
    }

    div {
        display: flex;
        flex-direction: column;
    }
    
    button {
        font-size: 2.3rem;
        color: white;
        margin-bottom: var(--spacing-scale-4x);
        background-color: var(--base-color);
        border: none;
        border-radius: 10px;
        min-width: 20rem;
    }
`;

export default ProfileSections;
