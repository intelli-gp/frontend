import styled from 'styled-components';

import Button from '../../components/Button';

const bgColor = '#eef2ff';

export const PageContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 4rem;

    @media (max-width: 768px) {
        padding: 6rem 1rem 2rem 1rem;
    }
`;

export const PageHeader = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    background: linear-gradient(to top, ${bgColor}, rgba(199, 210, 254, 0.75));
    padding: 4rem 2rem;
    border-radius: 10px;
    position: relative;
    @media (max-width: 768px) {
        flex-direction: column;
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
    box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
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
    padding: ${({ editing }) => !editing && '1rem'};
    border-radius: ${({ editing }) => !editing && '1000px'};
    font-size: 1rem;
    color: #334155;
`;
