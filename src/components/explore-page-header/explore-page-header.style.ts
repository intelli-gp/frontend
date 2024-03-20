import styled from 'styled-components';

import Button from '../button/button.component';

export const SearchBarContainer = styled.div`
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-300);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    gap: 1rem;
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
    max-width: 700px;
    min-width: 0px;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
`;
