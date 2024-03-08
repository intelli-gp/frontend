import styled from 'styled-components';

export const Image = styled.img<{
    height?: string;
    width?: string;
    radius?: string;
    cover?: string;
}>`
    object-fit: ${({ cover }) => cover || 'contain'};
    background-color: var(--indigo-50);
    cursor: pointer;
    height: ${({ height }) => height || '100%'};
    width: ${({ width }) => width || '100%'};
    opacity: 0.9;
    transition: opacity 0.3s ease;
    border-radius: ${({ radius }) => radius || ''};
    &:hover {
        opacity: 1;
    }
`;

export const OpenImageContainer = styled.div`
    position: relative;
`;
