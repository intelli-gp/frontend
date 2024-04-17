import { motion } from 'framer-motion';
import { LuSearch } from 'react-icons/lu';
import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';

export const Container = styled.div`
    background-color: transparent;
    display: flex;
    width: 100%;
    max-width: 750px;
    min-width: 0px;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
`;

export const SearchBarContainer = styled.div`
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-300);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    padding-left: 0.25rem;
    gap: 0.5rem;
    box-shadow: 0 0 20px 10px rgb(99, 102, 241, 0.075);
    position: relative;
`;

export const CreateButton = styled(motion.button)`
    border-radius: 50%;
    border: none;
    width: 40px;
    height: 40px;
    aspect-ratio: 1/1;
    box-sizing: content-box;
    color: var(--indigo-900);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    background-color: var(--indigo-200);
    transition: filter 0.15s ease-in-out;
    svg {
        stroke-width: 0.5;
    }
`;

export const SuggestionsContainer = styled(motion.ul)`
    position: absolute;
    width: calc(100% - 2rem);
    top: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    z-index: 10;
    box-shadow: 0 0 20px 10px rgb(99, 102, 241, 0.075);
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border: 1px solid var(--gray-300);
    overflow: hidden;
`;

export const SuggestionItem = styled(motion.li)<{ width?: string }>`
    transition: background-color 0.15s ease-in-out;
    display: block;
    cursor: pointer;
    padding: 0.25rem 0.75rem;
    margin: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    &:hover {
        background-color: var(--indigo-50);
    }
    &:first-child {
        margin-top: 0.5rem;
    }
    &:last-child {
        margin-bottom: 0.5rem;
    }
    ${CSSTextLengthLimit};
`;

export const SearchIcon = styled(LuSearch)`
    transition: all 0.2s ease-in-out;
    box-sizing: content-box;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background-color: var(--gray-100);
    }
`;
