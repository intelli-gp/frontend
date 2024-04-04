import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { HiBookmark } from 'react-icons/hi2';
import { SlOptions } from 'react-icons/sl';
import styled from 'styled-components';

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
    margin-bottom: 6rem;
    padding: 2.5rem 1rem;
`;

export const ArticleTitle = styled.h1`
    font-size: 2.75rem;
    letter-spacing: -1px;
    font-weight: 700;
    line-height: 1.1;
    font-family: 'Merriweather', serif;
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
`;

export const ArticleToolbar = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 1rem;
`;

export const Star = styled(FaStar)`
    cursor: pointer;
    color: var(--gray-600);
    transition: all 0.25s ease-in-out;
    &:hover {
        color: #fab005;
    }
`;

export const Bookmark = styled(HiBookmark)`
    cursor: pointer;
    color: var(--gray-600);
    transition: all 0.25s ease-in-out;
    &:hover {
        color: #5c940d;
    }
`;

export const Options = styled(SlOptions)`
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    color: var(--gray-600);
    &:hover {
        color: inherit;
    }
`;

export const SuggestedArticlesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;
