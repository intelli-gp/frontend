import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';
import EnhancedImage from '../image/image.component';
import { FollowButton } from '../follow-button/follow-button.component';

export const AuthorDataContainer = styled.div`
    color: inherit;
    border-radius: 1.25rem;
    padding: 0.25rem;
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
`;

export const AuthorProfileImage = styled(EnhancedImage)`
    aspect-ratio: 1/1;
    border-radius: 1rem;
    object-fit: cover;
    object-position: center;
    height: 135px;
    width: 135px;
`;

export const AuthorData = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    padding: 0.5rem 0;
    overflow: hidden;
    height: 135px;
`;

export const AuthorName = styled(Link)<{ width?: string }>`
    display: block;
    color: inherit;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.15;
    ${CSSTextLengthLimit}
    &:hover {
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-decoration-color: black;
    }
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

export const FollowButtonComponent = styled(FollowButton)`
    width: 75%;
    margin: 0 auto;
    height: 32px;
    font-size: 0.8;
    border-radius: 0.5rem;
    border-width: 1px;
    font-weight: 400;
`