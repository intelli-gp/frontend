import { Link } from 'react-router-dom';
import styled from 'styled-components';

import EnhancedImage from '../image/image.component';
import { CSSTextLengthLimit } from '../../index.styles';

export const AuthorDataContainer = styled(Link)`
    color: inherit;
    border-radius: 1.5rem;
    padding: 0.75rem;
    padding-right: 1.5rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(20%);
    width: min(400px, 100%);
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: white;
    gap: 1.25rem;
    box-shadow: 0px 0px 24px 5px rgba(0, 0, 0, 0.25);
    transition: background-color 0.25s ease-in-out;
    &:hover {
        background-color: var(--indigo-50);
    }
`;

export const AuthorProfileImage = styled(EnhancedImage)`
    aspect-ratio: 1/1;
    border-radius: 0.75rem;
    object-fit: cover;
    object-position: center;
    box-shadow: var(--gray-shadow);
    height: 135px;
    width: 135px;
`;

export const AuthorData = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    padding: 0.25rem 0;
    overflow: hidden;
    height: 135px;
`;

export const AuthorName = styled.p<{ width?: string }>`
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.15;
    ${CSSTextLengthLimit}
`;

export const AuthorHeadline = styled.p<{ width?: string }>`
    font-size: 0.8rem;
    opacity: 0.85;
    line-height: 1;
    ${CSSTextLengthLimit}
`;

export const AuthorUsername = styled.span`
    opacity: 0.8;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: -0.5rem;
`;

