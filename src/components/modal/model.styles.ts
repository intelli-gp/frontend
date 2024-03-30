import { motion } from 'framer-motion';
import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';

export const Background = styled(motion.div)`
    inset: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    inset: 0;
`;

export const ModalWrapper = styled(motion.div)<{ width?: 'sm' | 'md' | 'lg' }>`
    user-select: none;
    width: ${({ width }) => {
        switch (width) {
            case 'sm':
                return `min(100%, 350px)`;
            case 'md':
            case undefined:
                return `min(100%, 450px)`;
            case 'lg':
                return `min(100%, 650px)`;
        }
    }};
    max-height: 90vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 0.5rem;
    gap: 1rem;
`;

export const ModalHeader = styled.h2`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
`;

export const ModalTitle = styled.span<{ width?: string }>`
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    ${CSSTextLengthLimit}
`;

export const ModalContentContainer = styled.div`
    padding: 1rem 1.5rem;
    max-height: 70vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ModalExitButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.25rem;
    color: #000;
    padding: 0.25rem;
    border-radius: 10rem;
    transition: background 0.3s;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;
