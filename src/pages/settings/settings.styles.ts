import styled from 'styled-components';

import Button from '../../components/Button';

export const PageContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 2rem;

    @media (max-width: 768px) {
        padding: 6rem 1rem 2rem 1rem;
    }
`;

export const PageHeader = styled.header`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    gap: 2rem;
    background: var(--gradient-75-top);
    padding: 4rem 2rem;
    border-radius: 10px;
    position: relative;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ProfilePictureContainer = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
`;

export const ProfilePicture = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: var(--gray-shadow);
`;

export const PictureOverlay = styled(ProfilePicture)`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    &:hover {
        opacity: 0.2;
        cursor: pointer;
    }
`;

export const EditButton = styled(Button)<{ editing: boolean }>`
    align-self: end;
    padding: ${({ editing }) => (editing ? '0.5rem 2rem' : '1rem')};
    border-radius: ${({ editing }) => (editing ? '20px' : '1000px')};
    font-size: 1rem;
    color: #334155;
    gap: 0.5rem;
`;
