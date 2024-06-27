import { motion } from 'framer-motion';
import styled from 'styled-components';

import EnhancedImage from '../../components/image/image.component';

export const PageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export const PageHeader = styled.header`
    height: 35vh;
    width: 100%;
    position: relative;
`;

export const GroupTitle = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    left: 4rem;
    top: 50%;
    transform: translateY(-50%);
    @media (max-width: 1024px) {
        gap: 1rem;
        left: 3rem;
    }
`;

export const GroupCoverImage = styled(EnhancedImage)`
    width: 100%;
    height: 100%;
    border: none;
    filter: brightness(35%);

    @media (max-width: 768px) {
        max-height: 300px;
    }
`;

export const PictureOverlay = styled.img`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    transition: opacity 0.2s ease-in-out;
    object-fit: cover;

    box-shadow: var(--black-shadow);
    &:hover {
        opacity: 0.1;
        cursor: pointer;
    }
`;

export const GroupInfoContainer = styled.div`
    height: 65vh;
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const LeftPart = styled.div`
    padding: 2rem;
    margin: 0 auto;
    width: min(600px, 100%);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    @media (max-width: 768px) {
        padding: 1rem;
        grid-row: 2;
    }
`;

export const EditableSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

export const EditableSectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.25rem;
    h2 {
        font-size: 1.5rem;
        font-weight: 700;
    }
`;

export const EditableSectionBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const RightPart = styled.div`
    padding: 1rem;
    box-shadow: 0px 0px 60px 5px rgba(39, 31, 75, 0.07);
    background: white;
    height: 100%;
    overflow-y: auto;
    @media (max-width: 768px) {
        padding: 1rem;
        grid-row: 1;
    }
`;

export const UsersSectionTitle = styled.p`
    border-bottom: 1px solid var(--gray-100);
    text-transform: capitalize;
`;

export const UsersList = styled.div`
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    width: 100%;
    height: 100%;
`;

export const UsersListContainer = styled.div`
    max-height: 50%;
`;

export const EditButton = styled.button`
    cursor: pointer;
    aspect-ratio: 1/1;
    color: var(--gray-600);
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    &:hover {
        color: black;
        background-color: var(--indigo-50);
    }
`;
