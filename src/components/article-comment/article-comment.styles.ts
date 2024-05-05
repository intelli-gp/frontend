import MDEditor from '@uiw/react-md-editor';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';
import EnhancedImage from '../image/image.component';

export const CommentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    &:not(:last-child) {
        border-bottom: 1px solid var(--gray-300);
    }
`;

export const WriteCommentContainer = styled(CommentContainer)`
    margin-top: auto;
    padding: 0.75rem;
    background-color: white;
`;

export const CommentHeader = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    overflow: hidden;
`;

export const CommenterProfileImage = styled(EnhancedImage)`
    width: 2.5rem;
    height: 2.5rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
`;

export const CommenterFullName = styled(Link)<{ width?: string }>`
    font-size: 1rem;
    line-height: 1;
    color: inherit;
    ${CSSTextLengthLimit}
    &:hover {
        text-decoration: underline;
    }
`;

export const CommentDate = styled.p<{ width?: string }>`
    font-size: 0.875rem;
    opacity: 0.75;
    color: inherit;
    ${CSSTextLengthLimit}
`;

export const CommentLikeContainer = styled(motion.div)<{ active: boolean }>`
    box-shadow: rgba(0, 0, 0, 0.075) -2px 2px 4px 0px;
    user-select: none;
    margin-left: auto;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    color: black;
    cursor: pointer;
    padding: 0.125rem 0.75rem;
    border-radius: 5rem;
    background-color: ${({ active }) =>
        active ? 'var(--yellow-500)' : 'transparent'};
    border: 1px solid;
    border-color: ${({ active }) =>
        active ? 'var(--yellow-500)' : 'var(--gray-400)'};
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: var(--yellow-500);
        border-color: var(--yellow-500);
    }
`;

export const CommentContent = styled(MDEditor.Markdown)`
    font-size: 0.875rem;
    line-height: 1.5;
    word-break: break-word;
    font-family: inherit;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: var(--gray-100) !important;
    min-height: 100px;
    width: 100%;
`;
