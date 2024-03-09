import styled from 'styled-components';

export const PageContainer = styled.div`
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
    bottom: 10px;
    left: 0;
    right: 0;
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: white;
    gap: 1rem;

    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: var(--indigo-50);
        cursor: pointer;
    }
`;

export const AuthorProfileImage = styled.img`
    width: 75px;
    height: 75px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    box-shadow: var(--gray-shadow);
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
