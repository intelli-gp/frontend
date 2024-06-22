import { motion } from 'framer-motion';
import { GoDownload } from 'react-icons/go';
import { GrAttachment } from 'react-icons/gr';
import { IoShareSocial } from 'react-icons/io5';
import styled, { css } from 'styled-components';

import Button from '../../components/button/button.component';

export const PageContainer = styled(motion.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: calc(100vh - 56px);
    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
`;

export const SearchBarContainer = styled.div`
    width: 100%;
    border-radius: 5rem;
    border: 1px solid var(--gray-300);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 0 20px 10px rgb(99, 102, 241, 0.075);
    position: relative;
    z-index: 1;
`;

export const Background = styled(motion.div)`
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    width: 100%;
`;
export const AttachmentIcon = styled(GrAttachment)`
    transition: all 0.2s ease-in-out;
    box-sizing: content-box;
    padding: 0.7rem 1rem;
    color: var(--indigo-900);
    cursor: pointer;
    aspect-ratio: 1/1;
    border-radius: 5rem 0rem 0rem 5rem;
    box-shadow: inset -10px 0px 8px -6px rgb(99, 102, 241, 0.075);
    background-color: var(--indigo-25);
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color: var(--indigo-50);
    }
`;
export const GenerateButton = styled(Button)`
    padding: 0.5rem 2.5rem;
    color: var(--indigo-900);
    border-radius: 0rem 5rem 5rem 0rem;
    background-color: var(--indigo-25);
    border: none;
    box-shadow: inset 10px 0px 6px -6px rgb(99, 102, 241, 0.075);
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color: var(--indigo-50);
    }
`;
export const Holder = styled.div`
    width: 100%;
    background-color: var(--indigo-25);
    border-radius: 6px;
    flex: 1;
`;
const commonFooterIconStyles = css`
    color: var(--indigo-900);
    box-sizing: content-box;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    padding: 0.5rem;
    border-radius: 50%;
    &:hover {
        color: var(--indigo-50);
        background-color: var(--indigo-900);
    }
`;
export const ShareIcon = styled(IoShareSocial)`
    ${commonFooterIconStyles}
`;

export const DownloadIcon = styled(GoDownload)`
    ${commonFooterIconStyles}
`;
