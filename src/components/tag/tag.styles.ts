import styled from 'styled-components';

export const TagContainer = styled.div<{ size?: string; deletable?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    gap: 0.5rem;
    padding: ${({ deletable }) =>
        deletable ? '0.2rem 0.2rem 0.2rem 1rem' : '0.3rem 1rem'};
    border-radius: 10000px;
    font-size: ${({ size }) => {
        switch (size) {
            case 'small':
                return '0.8rem';
            case 'medium':
                return '1rem';
            case 'large':
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
        box-shadow: var(--tag-shadow)
    }
`;

export const DeleteTagButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10000px;
    padding: 0.2rem 0.5rem;
    color: var(--indigo-900);
    background-color: #eef2ff;
    font-weight: bolder;

    &:hover {
        background-color: var(--indigo-100);
    }
`;
