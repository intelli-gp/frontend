import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';

export const UserItemContainer = styled.li`
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr) auto;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    border-radius: 10px;
`;

export const UserFullName = styled.p<{ width?: string }>`
    line-height: 1.2;
    ${CSSTextLengthLimit}
`;

export const UserUserName = styled.p<{ width?: string }>`
    line-height: 1.2;
    font-size: 0.8rem;
    opacity: 0.8;
    ${CSSTextLengthLimit}
`;

export const UserItemImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;
