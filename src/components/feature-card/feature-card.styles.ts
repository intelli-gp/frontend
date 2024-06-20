import { motion } from 'framer-motion';
import styled from 'styled-components';

import EnhancedImage from '../image/image.component';

export const CardContainer = styled(motion.div)`
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px 3px;
    display: flex;
    gap: 1rem;
    align-items: center;
    user-select: none;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.025);
    }

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        padding: 1.5rem;
        gap: 0.25rem;
    }

    max-width: 700px;
    margin: 0 auto;
`;

export const CardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
`;

export const CardTitle = styled.h2`
    font-size: 1.75rem;
    font-weight: 700;
`;

export const CardDescription = styled.p`
    font-size: 1rem;
`;

export const CardImage = styled(EnhancedImage)`
    height: 10rem;
    width: 10rem;
    aspect-ratio: 1;
    flex-shrink: 0;
    padding: 0.25rem;
`;
