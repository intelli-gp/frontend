import styled from 'styled-components';
import Button from '../Button';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 250px;
    height: fit-content;
    height: -moz-fit-content;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgb(99, 102, 241, 0.2);
    background-color: var(--gray-50);
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: var(--indigo-50);
        box-shadow: 0 0 10px 0 rgb(99, 102, 241, 0.25);
    }
`;

export const CardImageContainer = styled.div`
    width: 100%;
    height: 120px;
    position: relative;
`;

export const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`;

export const GroupTitleGradient = styled.div`
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0.85),
        rgba(255, 255, 255, 0)
    );
`;

export const GroupTitle = styled.h3`
    color: var(--gray-700);
    font-weight: bold;
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: -25%;
    font-size: 1.5rem;
`;

export const TagsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 0 0.5rem;
`;


export const JoinButton = styled(Button)`
    padding: 0.25rem 2rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background-color: var(--gray-700);
    transition: all 0.25s ease-in-out;
    &:hover {
        background-color: #0D6C20;
    }
`