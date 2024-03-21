import styled from 'styled-components';

import { CSSTextLinesCountLimit } from '../../index.styles';

export const ArticleContainer = styled.article`
    margin: 0 auto;
    width: min(800px, 100%);
    flex: 1;
    background-color: white;
    cursor: pointer;
    border-radius: 0.5rem;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    transition: background-color 0.2s ease-in-out;
    border-bottom: 1px solid var(--gray-400);
    &:hover {
        background-color: var(--indigo-50);
        border-radius: 0.5rem;
    }
    @media (max-width: 768px) {
        padding: 1rem 1.5rem;
    }

    @media (max-width: 425px) {
        padding: 1rem;
    }
`;

export const AuthorData = styled.header`
    display: flex;
    align-items: center;
    font-size: 0.875rem; // 14px
    font-weight: 500;
    gap: 0.75rem;
`;

export const ArticleTitle = styled.h1<{ lines?: number }>`
    hyphens: auto;
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.15;
    ${CSSTextLinesCountLimit}
    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const AuthorPicture = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
`;

export const ArticleContentContainer = styled.main`
    width: 100%;
    display: flex;
    gap: 1rem;
    flex-direction: column;
`;

export const ArticleFooter = styled.footer`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const TagsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    @media (max-width: 768px) {
        display: none;
    }
`;

export const ArticleDate = styled.time`
    font-size: 0.875rem;
    opacity: 0.9;
    @media (max-width: 768px) {
        font-size: 0.75rem;
    }
`;

export const ArticleThumbnail = styled.img`
    max-width: 150px;
    object-fit: cover;
    border: none;
    aspect-ratio: 1/1;
    @media (max-width: 768px) {
        max-width: 100px;
    }
`;
