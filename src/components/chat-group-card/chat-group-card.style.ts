import styled from 'styled-components';

import { CSSTextLengthLimit, CSSTextLinesCountLimit } from '../../index.styles';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 225px;
    height: fit-content;
    height: -moz-fit-content;
    border-radius: 0.5rem;
    transition: all 0.25s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
    cursor: pointer;

    &:hover {
        background-color: var(--indigo-25);
    }
`;

export const CardImageContainer = styled.div`
    background-color: var(--gray-100);
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

export const GroupInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 0.5rem;
    width: 95%;
    margin: 0 auto;
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
    font-weight: 700;
    letter-spacing: -0.5px;
    font-size: 1rem;
    ${CSSTextLengthLimit}
`;

export const MembersCount = styled.p`
    font-size: 0.75rem;
    opacity: 0.8;
    margin-top: -0.25rem;
    display: flex;
    gap: 0.125rem;
    align-items: center;
`;

export const TagsContainer = styled.div`
    display: flex;
    gap: 0.25rem;
    max-width: 100%;
    overflow: auto;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding-bottom: 1rem;
    & button {
        border-radius: 99rem;
        padding: 0.25rem 0;
        width: 90%;
        margin: 0 auto;
        font-size: 0.875rem;
        &:hover {
            filter: brightness(0.95);
        }
    }
`;

export const GroupDescription = styled.p<{ width?: string; lines?: number }>`
    font-size: 0.875rem;
    opacity: 0.8;
    ${CSSTextLinesCountLimit}
`;
