import styled from 'styled-components';

import { CSSTextLinesCountLimit } from '../../index.styles';
import EnhancedImage from '../image/image.component';

export const ArticleContainer = styled.article`
    margin: 0 auto;
    width: min(800px, 100%);
    flex: 1;
    background-color: white;
    cursor: pointer;
    border-radius: 0.5rem;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    transition: background-color 0.2s ease-in-out;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    &:hover {
        background-color: var(--indigo-25);
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
    align-self: flex-start;
    font-size: 0.875rem; // 14px
    font-weight: 500;
    gap: 0.75rem;

    &:hover {
        span {
            border-color: var(--indigo-800);
        }
    }
`;

export const AuthorFullName = styled.span`
    line-height: 1.15;
    transition: border-color 0.2s ease-in-out;
    border-bottom: 1px solid transparent;
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

export const AuthorPicture = styled(EnhancedImage)`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
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
    font-size: 0.8rem;
    opacity: 0.9;
    @media (max-width: 768px) {
        font-size: 0.75rem;
    }
`;

export const ArticleThumbnail = styled(EnhancedImage)`
    max-width: 150px;
    border-radius: 0.25rem;
    aspect-ratio: 1/1;
    @media (max-width: 768px) {
        max-width: 100px;
    }
`;
