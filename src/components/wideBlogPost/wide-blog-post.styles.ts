import styled from 'styled-components';

const blogHeight = '300px';

export const BlogContainer = styled.article`
    width: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    height: ${blogHeight};
    &:hover {
        cursor: pointer;
        background-color: #f8f9fa;
    }
`;

export const AuthorData = styled.header`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const AuthorPicture = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
`;

export const BlogContentContainer = styled.main`
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
`;

export const BlogTextContent = styled.p`
    font-size: 0.8rem;
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const BlogFooter = styled.footer`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const BlogThumbnail = styled.img`
    max-width: 30%;
    object-fit: cover;
    border: none;
    border-radius: 10px;
    max-height: ${blogHeight};
    aspect-ratio: 5/4;
`;
