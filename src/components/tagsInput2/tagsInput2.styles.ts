import styled from 'styled-components';

import { SuggestionItem, SuggestionsList } from '../tagsInput/tagsInput.styles';

export const ComponentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: relative;
`;

export const TagsContainer = styled.div<{ disabled?: boolean }>`
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'text')};
    
    background-color: ${({ disabled }) =>
        disabled ? 'var(--gray-100)' : 'white'};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

    border-radius: 0.25rem;
    border: 1px solid var(--gray-500);
    padding: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    resize: vertical;
    resize: vertical;
    overflow-y: auto;

    & input {
        background-color: transparent;
        outline: none;
        font-size: 0.875rem;
    }

    &:focus-within {
        outline: 1px solid var(--indigo-700);
    }
`;

export const Dropdown = styled(SuggestionsList)`
    top: 105%;
`;

export const TagListItem = styled(SuggestionItem)``;
