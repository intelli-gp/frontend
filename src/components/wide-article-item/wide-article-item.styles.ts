import styled from 'styled-components';

export const ArticleContainer = styled.article`
    margin: 0 auto;
    width: min(1000px, 100%);
    flex: 1;
    background-color: white;
    cursor: pointer;
    border-radius: 1rem;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    background-color: var(--gray-100);
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: var(--indigo-50);
    }
    @media (max-width: 768px) {
        padding: 1rem 1.5rem;
    }
`;

export const AuthorData = styled.header`
    display: flex;
    align-items: center;
    gap: 1rem;
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
    align-items: center;
    gap: 1rem;
`;

export const ArticleThumbnail = styled.img`
    max-width: 150px;
    object-fit: cover;
    border: none;
    aspect-ratio: 1/1;
    @media (max-width: 768px) {
        max-width: 80px;
    }
`;
