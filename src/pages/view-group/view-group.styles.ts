import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
`;

export const GroupCoverImageContainer = styled.div`
    height: 30vh;
    position: relative;
    width: 100%;
`;

export const GroupTitleHolder = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 20px;
    left: 4rem;
    top: 50%;
    transform: translateY(-50%);
    @media (max-width: 1024px) {
        gap: 15px;
        left: 3rem;
    }
`;
export const GroupCoverImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
    filter: brightness(50%);

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
    transition: opacity 0.3s ease-in-out;
    object-fit: cover;

    box-shadow: var(--black-shadow);
    &:hover {
        opacity: 0.1;
        cursor: pointer;
    }
`;

export const GroupInfoContainer = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: 6fr 3fr;
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
    padding: 15px;
    box-shadow: 0px 0px 60px 5px rgba(39, 31, 75, 0.07);
    background: white;
    height: 100%;
    @media (max-width: 768px) {
        padding: 1rem;
        grid-row: 1;
    }
`;

export const StatusTitle = styled.p`
    margin: 0px 15px 0px 5px;
    font-size: 15px;
    font-weight: 600;
    color: var(--gray-700);
`;

export const PeopleContainer = styled.div`
    padding: 1rem;
    display: flex;
    gap: 1rem;
    width: 100%;
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
