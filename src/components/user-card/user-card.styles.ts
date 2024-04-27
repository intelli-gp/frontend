import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

import { CSSTextLengthLimit } from '../../index.styles';
import Button from '../button/button.component';
import EnhancedImage from '../image/image.component';

const CARD_WIDTH = '225px';

export const CardContainer = styled(Link)`
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1.5rem;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
    transition: all 0.2s ease-in-out;
    width: ${CARD_WIDTH};
    cursor: pointer;
    &:hover {
        background-color: var(--indigo-25);
    }
`;

export const UserImage = styled(EnhancedImage)`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    aspect-ratio: 1/1;
`;

export const UserFullName = styled.p<{ width?: string }>`
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    ${CSSTextLengthLimit}
`;

export const UserUsername = styled.p<{ width?: string }>`
    text-align: center;
    font-size: 0.9rem;
    opacity: 0.65;
    font-weight: bold;
    margin-top: -0.5rem;
    ${CSSTextLengthLimit}
`;

export const FollowButton = styled(Button)`
    border-radius: 99rem;
    padding: 0.25rem 0;
    width: 90%;
    margin: 0 auto;
    font-size: 0.875rem;
    margin-top: 0.75rem;
    background-color: var(--yellow-500);
    border-color: var(--yellow-500);
`;

export const SwiperCustomSlide = styled(SwiperSlide)<{ width?: string }>`
    width: ${({ width }) => width ?? CARD_WIDTH} !important;
`;
