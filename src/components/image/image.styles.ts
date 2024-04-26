import styled from 'styled-components';

export const ImageContainer = styled.div<{ width?: string; height?: string }>`
    position: relative;
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
`;

export const Image = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
    object-position: center;
    z-index: 2;
`;

export const Placeholder = styled.div<{ transparent?: boolean }>`
    position: absolute;
    border-radius: inherit;
    background-color: ${({ transparent }) => (transparent ? 'transparent' : 'var(--gray-200)')};
    height: 100%;
    width: 100%;
    inset: 0;
    z-index: 1;
`;
