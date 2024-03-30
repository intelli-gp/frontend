import { motion } from 'framer-motion';
import styled from 'styled-components';

import Button from '../../components/button/button.component';

export const PageContainer = styled(motion.div)`
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (max-width: 500px) {
        padding: 1rem;
    }
`;

export const ArticleCoverImageContainer = styled.div`
    width: 100%;
    position: relative;
`;

export const ArticleCoverImage = styled.img`
    width: 100%;
    min-height: 250px;
    max-height: 400px;
    object-fit: cover;
    cursor: pointer;
`;

export const EditButton = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1rem;
    color: var(--gray-800);
    padding: 0.5rem;
    border-radius: 0;
`;

export const ArticleTitleInput = styled.textarea`
    font-size: 2rem;
    font-weight: 700;
    border: none;
    border-bottom: 2px solid var(--gray-500);
    padding: 0.5rem 0;
    width: 100%;
    outline: none;
    color: var(--gray-700);
`;

export const SectionContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const AddSectionMenu = styled.div`
    border-radius: 10px;
    display: flex;
    background-color: var(--indigo-100);
    flex-direction: column;
    position: absolute;
    height: fit-content;
    bottom: 100%;
    right: 120%;
    box-shadow: var(--black-shadow);
    padding: 0.5rem;
`;

export const AddSectionItem = styled.li`
    color: var(--indigo-800);
    font-weight: bold;
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:last-child {
        border-bottom: none;
    }
    &:hover {
        background-color: var(--indigo-200);
    }
`;
