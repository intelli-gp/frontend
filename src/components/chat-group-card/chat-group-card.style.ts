import styled, { css } from 'styled-components';

import { CSSTextLengthLimit, CSSTextLinesCountLimit } from '../../index.styles';
import EnhancedImage from '../image/image.component';

export const CardContainer = styled.div<{ profilePage?: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 100%;
    height: -moz-fit-content;
    border-radius: 0.5rem;
    transition: all 0.25s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
    background-color: white;
    gap: 1rem;
    cursor: pointer;
    padding-bottom: ${({ profilePage }) => (profilePage ? '1.25rem' : '0')};
    &:hover {
        background-color: var(--indigo-25);
    }
`;

export const CardImage = styled(EnhancedImage)`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`;

export const GroupInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 0.5rem;
    width: 95%;
    margin: 0 auto;
`;

export const GroupTitle = styled.h3<{ width?: string }>`
    font-weight: 700;
    letter-spacing: -0.5px;
    font-size: 1rem;
    ${CSSTextLengthLimit}
`;

export const MembersCount = styled.p`
    font-size: 0.75rem;
    opacity: 0.8;
    margin-top: -0.5rem;
    display: flex;
    gap: 0.125rem;
    align-items: center;
`;

export const TagsContainer = styled.div`
    display: flex;
    gap: 0.25rem;
    max-width: 100%;
    overflow: auto;
`;

export const GroupDescription = styled.p<{ width?: string; lines?: number }>`
    font-size: 0.875rem;
    line-height: 1.2rem;
    height: 2.4rem;
    ${CSSTextLinesCountLimit}
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding-bottom: 1rem;
    & button {
        border-radius: 0.75rem;
        padding: 0.25rem 0;
        width: 90%;
        margin: 0 auto;
        font-size: 0.875rem;
        &:hover {
            filter: brightness(0.95);
        }
    }
`;

export const BadgeContainer = styled.div<{ role: string }>`
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    padding: 0.35rem;
    border-radius: 50%;
    z-index: 10;
    ${({ role }) => {
        switch (role) {
            case 'owner':
                return css`
                    background-color: #fab005;
                `;
            case 'admin':
                return css`
                    background-color: #74c0fc;
                `;
            case 'member':
            case undefined:
                return css`
                    background-color: #68d391;
                `;
        }
    }}
`;
