import styled from 'styled-components';

export const TagsContainer = styled.div<{ disabled?: boolean }>`
    position: relative;
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'text')};
    background-color: ${({ disabled }) => disabled && '#FAFAFA'};
    border-radius: 5px;
    border: 1px solid var(--slate-400);
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    resize: vertical;
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

    & input {
        background-color: transparent;
        outline: none;
    }

    &:focus-within {
        outline: 2px solid var(--indigo-700);
    }
`;

export const Dropdown = styled.div`
    border-radius: 5px;
    width: 100%;
    display: flex;
    background-color: var(--indigo-50);
    flex-direction: column;
    position: absolute;
    top: 110%;
    left: 0;
    box-shadow: var(--gray-shadow);
    padding: 0.5rem;
`;

export const TagListItem = styled.li`
    color: var(--indigo-900);
    font-weight: bold;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
        background-color: var(--indigo-100);
    }
`;
