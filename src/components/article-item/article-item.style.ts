import styled from 'styled-components';

import EnhancedImage from '../image/image.component';

export const Title = styled.h1`
    padding-top: 0.4rem;
    font-size: 1.2rem;
    text-transform: capitalize;
    color: var(--slate-800);
    font-weight: bold;
    max-width: 70%;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    display: -webkit-box;
`;
export const ArticleImg = styled(EnhancedImage)`
    width: 100%;
    object-fit: cover;
    aspect-ratio: 1/1;
    height: 45%;
    border-radius: 0.75rem 0.75rem 0 0;
    box-shadow: 0 4px 6px 0 rgba(31, 41, 55, 0.1);
`;
export const Container = styled.div`
    width: 100%;
    height: 80%;
    transition: transform 0.2s;
    border-radius: 0.75rem 0.75rem 0 0;
    display: flex;
    flex-direction: column;
    box-shadow: var(--gray-shadow);
    margin-bottom: 1.5rem;

    &:hover {
        transform: scale(0.95);
    }
`;

export const Image = styled.img`
    width: 100%;
    border-radius: 0.75rem 0.75rem 0 0;
`;

export const UserImage = styled.img`
    margin-right: 1rem;
    height: 2.3rem;
    width: 2.3rem;
    border-radius: 50%;
    object-fit: cover;
`;

export const Username = styled.p`
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: capitalize;
    color: var(--slate-600);
`;
export const Graph = styled.p`
    font-size: 1rem;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    display: -webkit-box;
`;
