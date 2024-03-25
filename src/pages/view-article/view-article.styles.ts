import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';

export const PageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const ArticleCoverImageContainer = styled.div`
    position: relative;
`;

export const ArticleCoverImage = styled.img`
    object-fit: cover;
    object-position: center;
    max-height: 250px;
    width: 100%;
    height: 100%;
    filter: brightness(0.75);
`;

export const AuthorDataContainer = styled.div`
    border-radius: 1.5rem;
    padding: 2rem;
    position: absolute;
    bottom: -1rem;
    left: 0;
    right: 0;
    width: min(400px, 90%);
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: white;
    gap: 1rem;
    box-shadow: 0px 0px 24px 5px rgba(0, 0, 0, 0.25);
`;

export const AuthorProfileImage = styled.img`
    aspect-ratio: 1/1;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    box-shadow: var(--gray-shadow);
`;

export const AuthorName = styled(Link)<{ width?: string }>`
    color: var(--gray-800);
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 1.15;
    border-bottom: 1px solid transparent;
    transition: all 0.3s ease-in-out;
    &:hover {
        border-bottom: 1px solid var(--gray-800);
    }
    ${CSSTextLengthLimit}
`;

export const PublishDate = styled.time`
    font-size: 0.8rem;
    opacity: 0.8;
`;

export const ArticleBodyContainer = styled.div`
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-bottom: 6rem;
`;

export const ArticleImageSection = styled.img`
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
`;

export const ArticleToolbar = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 1rem;
`;

export const AuthorMoreInfoContainer = styled.div`
    background-color: var(--indigo-50);
    padding: 2rem 4rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 1rem;
`;

export const SuggestedArticlesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;
