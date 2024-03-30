import styled from 'styled-components';

export const TagsContainer = styled.div<{ disabled?: boolean }>`
    position: relative;
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'text')};
    background-color: ${({ disabled }) => disabled && '#FAFAFA'};
    border-radius: 5px;
    border: 1px solid var(--gray-600);
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    resize: vertical;
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    resize: vertical;

    & input {
        background-color: transparent;
        outline: none;
    }

    &:focus-within {
        outline: 1px solid var(--indigo-700);
    }
`;

export const Dropdown = styled.div`
    border-radius: 5px;
    max-width: min(400px, 100%);
    display: flex;
    background-color: var(--indigo-50);
    flex-direction: column;
    position: absolute;
    top: 110%;
    left: 0;
    box-shadow:
        rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
        rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    padding: 0.5rem;
    z-index: 100;
`;

export const TagListItem = styled.li`
    color: var(--indigo-900);
    font-weight: 500;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    border-bottom: 1px solid var(--gray-300);
    &:hover {
        border-bottom-color: transparent;
        border-radius: 5px;
        background-color: var(--indigo-100);
    }
    &:last-child {
        border-bottom: none;
    }
`;
