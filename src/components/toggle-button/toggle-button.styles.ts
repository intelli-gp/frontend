import { motion } from 'framer-motion';
import styled from 'styled-components';

const HEIGHTS = {
    SM: '20px',
    MD: '25px',
    LG: '30px',
};

export const ButtonContainer = styled(motion.div)<{
    size?: 'sm' | 'md' | 'lg';
    isOn: boolean;
}>`
    ${({ size }) => {
        switch (size) {
            case 'sm':
                return `
                height: ${HEIGHTS.SM};
                width: calc(${HEIGHTS.SM} * 1.618);
                padding: 0.125rem;
                `;
            case 'md':
            case undefined:
                return `
                    height: ${HEIGHTS.MD};
                    width: calc(${HEIGHTS.MD} * 1.618);
                    padding: 0.2rem;
                    `;
            case 'lg':
                return `
                    height: ${HEIGHTS.LG};
                    width: calc(${HEIGHTS.LG} * 1.618);
                    padding: 0.25rem;
                `;
        }
    }}
    border-radius: 50px;
    background-color: ${({ isOn }) => (isOn ? 'var(--indigo-700)' : 'gray')};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    &[data-is-on='true'] {
        justify-content: flex-end;
    }
`;

export const ButtonToggler = styled(motion.div)`
    height: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: white;
`;
