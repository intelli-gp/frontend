import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 250px;
    height: fit-content;
    height: -moz-fit-content;
    border-radius: 0.5rem;
    transition: all 0.25s ease-in-out;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;

    &:hover {
        scale: 1.025;
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
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0)
    );
`;

export const GroupTitle = styled.h3<{ width?: string }>`
    padding: 0 0.5rem;
    font-weight: 700;
    letter-spacing: -1px;
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: -25%;
    font-size: 1.75rem;
    ${CSSTextLengthLimit}
`;

export const TagsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 0 0.5rem;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding-bottom: 1rem;
    & button {
        border-radius: 99rem;
        padding: 0.25rem 4rem;
        font-size: 0.875rem;
        &:hover {
            filter: brightness(0.95);
        }
    }
`;
