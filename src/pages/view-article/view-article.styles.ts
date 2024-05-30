import { motion } from 'framer-motion';
import { BiSolidComment } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { IoHeart } from 'react-icons/io5';
import { IoBookmark } from 'react-icons/io5';
import styled, { css } from 'styled-components';

import EnhancedImage from '../../components/image/image.component';

export const PageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ArticleCoverImageContainer = styled.div`
    position: relative;
    height: 30vh;
`;

export const ArticleCoverImage = styled(EnhancedImage)`
    width: 100%;
    height: 100%;
    filter: brightness(0.75);
`;

export const ArticleHeader = styled.header`
    width: min(750px, 100%);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ArticleBodyContainer = styled.div`
    width: min(750px, 100%);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2.5rem 1rem;
    border-bottom: 2px solid var(--gray-200);
`;

export const ArticleTitle = styled.h1`
    font-size: 2.75rem;
    letter-spacing: -1px;
    font-weight: 700;
    line-height: 1.1;
    font-family: 'Merriweather', serif;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 2.25rem;
    }
`;

export const ArticleImageSection = styled.img`
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
`;

export const PublishDate = styled.p`
    margin-top: -0.5rem;
    font-size: 0.875rem;
    text-align: center;
`;

export const ArticleToolbar = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 1rem 0.5rem;
`;

export const ToolbarIconsContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

export const VerticalLine = styled.div`
    width: 1px;
    height: 100%;
    background-color: var(--gray-400);
`;

export const InteractionCounter = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--gray-600);
    cursor: pointer;
    border: none;
    background-color: transparent;
    user-select: none;
    &:hover {
        text-decoration: underline;
    }
`;

const commonIconStyles = css`
    cursor: pointer;
    stroke: var(--gray-600);
    transition: color 0.1s ease-in-out;
`;

export const LoveIcon = styled(IoHeart)<{ active: boolean }>`
    ${commonIconStyles}
    color: ${({ active }) => (active ? '#f03e3e' : 'transparent')};
    stroke-width: ${({ active }) => (active ? 0 : 25)}px;
    &:hover {
        stroke-width: 0;
        color: #f03e3e;
    }
`;

export const BookmarkIcon = styled(IoBookmark)<{ active: boolean }>`
    ${commonIconStyles}
    color: ${({ active }) => (active ? '#5c940d' : 'transparent')};
    stroke-width: ${({ active }) => (active ? 0 : 25)}px;
    &:hover {
        stroke-width: 0;
        color: #5c940d;
    }
`;

export const OptionsIcon = styled(BsThreeDots)`
    ${commonIconStyles}
    color: var(--gray-600);
    stroke-width: 0;
    &:hover {
        color: inherit;
    }
`;

export const CommentsIcon = styled(BiSolidComment)<{ active: boolean }>`
    ${commonIconStyles}
    color: ${({ active }) => (active ? 'black' : 'transparent')};
    stroke-width: ${({ active }) => (active ? 0 : 1)}px;
    &:hover {
        stroke-width: 0;
        color: black;
    }
`;

export const IconWithCounter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--gray-600);
`;

export const SuggestedArticlesTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
`;

export const SuggestedArticlesContainer = styled.div`
    max-width: 1000px;
    margin: 1rem auto 4rem auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: -100%;
    width: min(500px, 100%);
    height: 100%;
    background-color: white;
    z-index: 100;
    transition: right 0.25s ease-in-out;
    &.open {
        right: 0;
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
        z-index: 100;
    }
`;

export const EmptyPlaceholder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 1.25rem;
    color: var(--gray-500);
    width: 100%;
`;

export const UserItemsContainer = styled.ul`
    display: flex;
    flex-direction: column;
`;
