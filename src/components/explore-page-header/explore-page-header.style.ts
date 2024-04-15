import { LuSearch } from 'react-icons/lu';
import styled from 'styled-components';

import Button from '../button/button.component';

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
`;

export const CreateButton = styled(Button)`
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0 0 20px 10px rgb(99, 102, 241, 0.075);
`;

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
