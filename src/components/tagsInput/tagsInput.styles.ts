import { motion } from 'framer-motion';
import styled from 'styled-components';

export const TypingSection = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const SuggestionsList = styled(motion.div)`
    overflow-y: hidden;
    border-radius: 0.5rem;
    width: 300px;
    display: flex;
    background-color: var(--indigo-25);
    flex-direction: column;
    position: absolute;
    top: 110%;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 8px 0px;
`;

export const SuggestionItem = styled.li`
    color: var(--indigo-900);
    font-weight: bold;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    cursor: pointer;

    &:last-child {
        margin-bottom: 0.25rem;
    }
    &:first-child {
        margin-top: 0.25rem;
    }
    &:hover {
        background-color: var(--indigo-100);
    }
`;

export const SectionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
`;

export const SelectedTagsContainer = styled.div`
    background-color: var(--gray-50);
    width: 100%;
    border-radius: 10px;
    height: 175px;
    overflow-y: scroll;
    border: 1px solid var(--gray-400);
    padding: 1rem;
`;

export const SelectedTags = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const FooterButtons = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: absolute;
    bottom: 20px;
    right: 40px;
    @media (max-width: 426px) {
        bottom: 20px;
        right: 20px;
    }
`;
