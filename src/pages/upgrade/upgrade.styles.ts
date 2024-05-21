import { motion } from 'framer-motion';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import styled, { css } from 'styled-components';

import Button from '../../components/button/button.component';

export const PageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
`;

export const CheckBoxIcon = styled(RiCheckboxCircleLine)<{ pro?: boolean }>`
    color: ${({ pro }) => (pro ? 'var(--green-500)' : 'var(--indigo-950)')};
    width: 20px;
    box-sizing: content-box;
    flex-shrink: 0;
`;

export const CardHeader = styled.header<{ pro?: boolean }>`
    width: 100%;
    display: flex;
    padding: 0.5rem 0;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-color: ${({ pro }) => (pro ? 'var(--gray-600)' : 'var(--gray-500)')};
`;

export const CardTitle = styled.h2`
    font-size: 1.75rem;
    font-weight: 900;
    text-transform: capitalize;
`;

export const CardsOuterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 2rem;
`;

export const CardsInnerContainer = styled.div`
    gap: 2rem;
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const CardContainer = styled.div<{ pro?: boolean }>`
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    width: 350px;
    gap: 1.5rem;
    align-items: center;
    flex-grow: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px 3px;
    background: ${({ pro }) => (pro ? 'var(--gray-800)' : 'var(--indigo-100)')};
    color: ${({ pro }) => (pro ? 'white' : 'var(--indigo-950)')};
    border-radius: 1rem;
    position: relative;

    ${({ pro }) => {
        if (pro) {
            return css`
                &::after {
                    content: 'Most Popular';
                    position: absolute;
                    top: 0;
                    right: 50%;
                    transform: translate(50%, -50%);
                    box-shadow: 0px 0px 15px 10px rgba(72, 187, 120, 0.2);
                    font-weight: bold;
                    background-color: var(--green-500);
                    color: white;
                    padding: 0.5rem 1.5rem;
                    font-size: 0.875rem;
                    border-radius: 5rem;
                }
            `;
        }
    }}
`;

export const CardPrice = styled.p`
    font-size: 2.25rem;
    font-weight: 700;

    span {
        font-size: 1rem;
        font-weight: 400;
    }
`;

export const BenefitsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

export const ListItem = styled.li`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    line-height: 1.25;
    hyphens: auto;
`;

const commonButtonStyles = css`
    font-size: 0.875rem;
    margin-top: 1rem;
    width: 90%;
`;

export const UpgradeButton = styled(Button)`
    box-shadow: 0px 0px 15px 5px rgba(72, 187, 120, 0.2);
    background-color: var(--green-500);
    ${commonButtonStyles}
`;

export const SwitchToPremiumButton = styled(Button)`
    border: none;
    background-color: var(--indigo-950);
    box-shadow: 0px 0px 15px 5px rgba(99, 102, 241, 0.2);
    ${commonButtonStyles}
`;
