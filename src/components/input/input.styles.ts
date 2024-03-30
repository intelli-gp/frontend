import styled, { css } from 'styled-components';

const commonInputStyles = css<{ error?: string }>`
    border: 1px solid var(--gray-600);
    padding: 0.5rem;
    min-width: 0;
    border-radius: 0.25rem;

    outline-color: ${({ error }) => (error ? 'red' : 'var(--indigo-700)')};

    &:focus-visible {
        outline: 1px solid var(--indigo-700);
    }
`;

export const InputWithLabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0rem;
`;

export const Label = styled.label`
    font-weight: bold;
`;

export const TextAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0rem;
`;

export const Input = styled.input<{ error?: string }>`
    ${commonInputStyles}
`;

export const Textarea = styled.textarea<{ error?: string }>`
    ${commonInputStyles}
`;

export const TextAreaCounter = styled.span`
    font-family: 'JetBrains Mono', 'monospace';
    font-size: 0.65rem;
    color: var(--gray-700);
    align-self: flex-end;
`;
