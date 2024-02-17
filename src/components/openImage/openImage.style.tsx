import styled from 'styled-components';

export const Image = styled.img<{ height?: string; width?: string }>`
    object-fit: contain;
    background-color: var(--indigo-50);
    cursor: pointer;
    height: ${({ height }) => height || '100%'};
    width: ${({ width }) => width || '100%'};
    opacity: 0.9;
    transition: opacity 0.3s ease;
    &:hover {
        opacity: 1;
    }
`;

export const OpenImageContainer = styled.div`
    position: relative;
`;
