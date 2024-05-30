import { Link } from 'react-router-dom';
import styled from 'styled-components';

import EnhancedImage from '../image/image.component';

export const EmptyVectorContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export const EmptyVectorImage = styled(EnhancedImage)`
    width: min(400px, 90%);
    height: auto;
    aspect-ratio: 1/1;
`;

export const EmptyVectorText = styled.pre`
    font-family: inherit;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--gray-600);
    text-align: center;
    white-space: pre-wrap;
`;

export const EmptyVectorButton = styled(Link)`
    padding: 0.5rem 1.25rem;
    color: white;
    background-color: var(--indigo-900);
    border-radius: 0.25rem;
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: var(--indigo-800);
    }
`;
