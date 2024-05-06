import styled, { css } from 'styled-components';

import EnhancedImage from '../image/image.component';

export const ItemContainer = styled.div<{ read: boolean }>`
    display: flex;
    position: relative;
    gap: 1rem;
    border-radius: 0.5rem;
    padding: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
    cursor: pointer;
    background-color: ${({ read }) => (read ? 'white' : 'var(--indigo-100)')};
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: var(--indigo-50);
    }

    ${({ read }) => {
        if (read) return '';
        return css`
            &:after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 0.35rem;
                height: 100%;
                background-color: var(--indigo-500);
                border-radius: 0 0.5rem 0.5rem 0;
            }
        `;
    }}
`;

export const UserImage = styled(EnhancedImage)`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    aspect-ratio: 1/1;
`;

export const Username = styled.p`
    font-weight: 700;
    line-height: 1;
`;

export const Time = styled.time`
    font-size: 0.75rem;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
`;
