import styled from 'styled-components';

import { CSSTextLinesCountLimit } from '../../index.styles';
import EnhancedImage from '../image/image.component';

export const CardImageContainer = styled.div`
    height: 80px;
    position: relative;
`;

export const CardContainer = styled.div<{ unread: boolean }>`
    width: 75%;
    height: 140px;
    gap: 0.5rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 1.25rem 1.5rem;
    border-radius: 10px;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
    cursor: pointer;
    background-color: ${({ unread }) => (unread ?   'var(--indigo-50)':'white')};
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: var(--indigo-25);
    }
`;

export const CardImage = styled(EnhancedImage)`
    max-width: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: none;
    aspect-ratio: 1/1;
    @media (max-width: 768px) {
        max-width: 100px;
    }
`;
export const TypographyContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
    justify-content: space-between;
    margin-left: 0.25rem;
    gap: 6px;
`;

export const ChatDate = styled.time`
    font-size: 0.75rem;
    opacity: 0.9;
    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
`;

export const UnreadMessages = styled.div`
font-size: 0.85rem;
border-radius:100%;
padding:8px;
width:30px;
height:30px;
background-color:#F1EE63;
color:var(--indigo-950);
font-weight:900;
display:flex;
justify-content:center;
align-items: center;
`;
export const ChatContent = styled.p`
    font-size: 0.9rem;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
`;

export const GroupTitle = styled.h3<{ width?: string; lines?: number }>`
    ${CSSTextLinesCountLimit}
    font-weight: bold;
    font-size: 1.35rem;
`;
