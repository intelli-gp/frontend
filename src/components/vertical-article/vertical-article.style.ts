import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';
import EnhancedImage from '../image/image.component';

export const CardContainer = styled.div`
    height: 550px;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    border-radius: 1rem;
    padding: 0.25rem;
    width: 350px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    user-select: none;
    transition: all 0.25s ease-in-out;
`;

export const CardImage = styled(EnhancedImage)`
    border-radius: 0.75rem;
    width: 100%;
    height: 15rem;
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
`;

export const CardFooter = styled.footer`
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
`;

export const AuthorImage = styled(EnhancedImage)`
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
`;

export const AuthorName = styled(Link)<{ width?: string }>`
    font-weight: bold;
    color: inherit;
    ${CSSTextLengthLimit}
    &:hover {
        text-decoration: underline;
    }
`;

export const ArticleTime = styled.time`
    font-size: 0.75rem;
    color: var(--gray-700);
    font-weight: 500;
`;

export const ContinueWrapper = styled(Link)`
    flex-shrink: 0;
    margin-left: auto;
`;

export const ContinueReadingButton = styled(IoIosArrowForward)`
    padding: 0;

    border-radius: 5rem;
    color: black;
    padding: 0.5rem;
    box-sizing: content-box;

    cursor: pointer;
    transition: all 0.25s ease-in-out;
    background-color: var(--yellow-500);
    color: var(--gray-700);
    &:hover {
        background-color: var(--yellow-600);
    }
`;
