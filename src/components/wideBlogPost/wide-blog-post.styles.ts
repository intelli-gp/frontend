import styled from 'styled-components';

export const BlogContainer = styled.article`
    margin: 0 auto;
    width: min(1000px, 100%);
    flex: 1;
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    &:hover {
        cursor: pointer;
        background-color: #f8f9fa;
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
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
`;

export const BlogContentContainer = styled.main`
    width: 100%;
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
`;

export const BlogTextContent = styled.p`
    padding-right: 1rem;
    font-size: 0.8rem;
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    @media (max-width: 500px) {
        display: none;
    }
`;

export const BlogFooter = styled.footer`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const BlogThumbnail = styled.img`
    max-width: 120px;
    object-fit: cover;
    border: none;
    aspect-ratio: 1/1;
    @media (max-width: 768px) {
        max-width: 80px;
    }
`;
