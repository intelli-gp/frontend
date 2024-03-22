import styled, { css } from 'styled-components';

import { CSSTextLinesCountLimit } from '../../index.styles';
import Button from '../button/button.component';

export const CardContainer = styled.div`
    width: min(500px, 100%);
    gap: 1.25rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 1.25rem;
    border-radius: 10px;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: var(--indigo-50);
    }
`;

export const CardImage = styled.img`
    max-width: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: none;
    aspect-ratio: 1/1;
    @media (max-width: 768px) {
        max-width: 100px;
    }
`;

export const TypographyContainer = styled.div<{ role?: string }>`
    display: flex;
    flex: 1;
    gap: 0.5rem;
    height: 100%;
    flex-direction: column;
    align-content: flex-start;
    position: relative;

    &:after {
        content: '${({ role }) => role || 'member'}';
        text-transform: uppercase;
        font-weight: 900;
        border-radius: 0.5rem;
        position: absolute;
        top: -2rem;
        right: -2rem;
        padding: 0.25rem 0.5rem;
        font-size: 0.65rem;
        color: white;
        ${({ role }) => {
            switch (role) {
                case 'owner':
                    return css`
                        background-color: #74c0fc;
                    `;
                case 'admin': 
                    return css`
                        background-color: #68d391;
                    `;
                case 'member':
                case undefined:
                    return css`
                        background-color: #fab005;
                    `;         
            }}}
    }
`;

export const GroupTitle = styled.h3<{ width?: string; lines?: number }>`
    ${CSSTextLinesCountLimit}
    margin-left: 0.25rem;
    font-weight: bold;
    font-size: 1.25rem;
`;

export const TagsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

export const ExitButton = styled(Button)`
    white-space: nowrap;
    transition: all 0.25s ease-in-out;
    font-size: 0.875rem;
    @media (max-width: 568px) {
        font-size: 0.75rem;
    }
`;
