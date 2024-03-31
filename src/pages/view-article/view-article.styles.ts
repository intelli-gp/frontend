import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import EnhancedImage from "../../components/image/image.component"
import { CSSTextLengthLimit } from '../../index.styles';

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

export const AuthorDataContainer = styled(Link)`
    color: inherit;
    border-radius: 1.5rem;
    padding: 1rem 2rem;
    position: absolute;
    bottom: -1rem;
    left: 0;
    right: 0;
    width: min(400px, 100%);
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: white;
    gap: 1rem;
    box-shadow: 0px 0px 24px 5px rgba(0, 0, 0, 0.25);
`;

export const AuthorProfileImage = styled(EnhancedImage)`
    aspect-ratio: 1/1;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    box-shadow: var(--gray-shadow);
`;

export const AuthorName = styled.p<{ width?: string }>`
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

export const AuthorUsername = styled.span`
    opacity: 0.8;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: -0.5rem;
`;

export const PublishDate = styled.time`
    font-size: 0.8rem;
    opacity: 0.8;
`;

export const ArticleBodyContainer = styled.div`
    width: min(750px, 100%);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 6rem;
    padding: 2rem 1rem;
`;

export const ArticleTitle = styled.h1`
    font-size: 2.75rem;
    letter-spacing: -1px;
    font-weight: 700;
    line-height: 1.1;
    text-align: center;
    font-family: "Merriweather", serif;
`

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
