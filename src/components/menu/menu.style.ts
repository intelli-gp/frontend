import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div``;

export const MainElement = styled.div`
    position: relative;
`;

export const MenuElement = styled(motion.div)<{
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width?: string;
}>`
    top: ${(props) => props.top ?? 'auto'};
    left: ${(props) => props.left ?? 'auto'};
    right: ${(props) => props.right ?? 'auto'};
    bottom: ${(props) => props.bottom ?? 'auto'};
    width: ${(props) => props.width ?? 'auto'};
    background-color: var(--indigo-100);
    position: absolute;
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    z-index: 100;
`;

export const OptionElement = styled.div<{ fontSize?: string }>`
    cursor: pointer;
    user-select: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease-in-out;
    color: var(--indigo-950);
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-size: ${({ fontSize }) => {
        switch (fontSize) {
            case 'sm':
                return '0.75rem';
            case 'md':
            case undefined:
                return '1rem';
            case 'lg':
                return '1.25rem';
            default:
                return fontSize;
        }
    }};

    &:hover {
        background-color: var(--indigo-200);
    }
`;
