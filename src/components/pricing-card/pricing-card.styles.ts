import { RiCheckboxCircleLine } from 'react-icons/ri';
import styled, { css } from 'styled-components';

import Button from '../button/button.component';

export const CheckBoxIcon = styled(RiCheckboxCircleLine)<{ unique?: boolean }>`
    color: ${({ unique }) =>
        unique ? 'var(--green-500)' : 'var(--indigo-950)'};
    width: 20px;
    box-sizing: content-box;
    flex-shrink: 0;
`;

export const CardHeader = styled.header<{ unique?: boolean }>`
    width: 100%;
    display: flex;
    padding: 0.5rem 0;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-color: ${({ unique }) =>
        unique ? 'var(--gray-600)' : 'var(--gray-500)'};
`;

export const CardTitle = styled.h2`
    font-size: 1.75rem;
    font-weight: 900;
    text-transform: capitalize;
`;

export const CardContainer = styled.div<{
    unique?: boolean;
    withoutButton?: boolean;
}>`
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    width: 350px;
    gap: 1.5rem;
    align-items: center;
    flex-grow: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px 3px;
    background: ${({ unique }) =>
        unique ? 'var(--gray-800)' : 'var(--indigo-100)'};
    color: ${({ unique }) => (unique ? 'white' : 'var(--indigo-950)')};
    border-radius: 1rem;
    position: relative;

    ${({ unique, withoutButton }) => {
        let style = css``;
        if (withoutButton) {
            style = css`
                {...style}
                gap: 2rem;
                padding-bottom: 3rem;
            `;
        }
        if (unique) {
            style = css`
                {...style}
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
        return style;
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
