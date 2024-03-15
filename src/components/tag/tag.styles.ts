import styled from 'styled-components';

export const TagContainer = styled.div<{ size?: string; deletable?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: ${({ deletable }) =>
        deletable ? '0.2rem 0.2rem 0.2rem 1rem' : '0.3rem 1rem'};
    border-radius: 10000px;
    font-size: ${({ size }) => {
        switch (size) {
            case 'xs':
                return '0.6rem';
            case 'sm':
                return '0.8rem';
            case 'md':
                return '1rem';
            case 'lg':
                return '1.2rem';
            default:
                return '1rem';
        }
    }};
    background-color: var(--indigo-200);
    cursor: pointer;

    &:hover {
        background-color: #1e40af;
        color: white;
        box-shadow: var(--tag-shadow);
    }
    transition: background-color linear 100ms;
`;

export const TagText = styled.p`
    max-width: 12ch;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: bold;
`;

export const DeleteTagButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10000px;
    padding: 0.2rem 0.5rem;
    color: var(--indigo-900);
    background-color: var(--indigo-50);
    font-weight: bolder;
    transition: all 0.25s ease-in-out;
    &:hover {
        background-color: var(--indigo-200);
    }
`;
