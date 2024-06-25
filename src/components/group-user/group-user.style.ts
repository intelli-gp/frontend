import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';
import EnhancedImage from '../image/image.component';

export const PersonContainer = styled.div`
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    border-radius: 0.75rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0.5rem;
    gap: 0.75rem;
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background: var(--indigo-25);
    }
`;

export const PersonName = styled(Link)<{ width?: string }>`
    text-align: center;
    display: block;
    color: inherit;
    font-size: 0.8rem;
    flex-shrink: 1;
    flex-grow: 0;
    width: 100%;
    &:hover {
        text-decoration: underline;
    }
    ${CSSTextLengthLimit};
`;

export const PersonImage = styled(EnhancedImage)`
    height: 70px;
    width: 70px;
    border-radius: 50%;
`;

export const CrownHolder = styled.div`
    position: absolute;
    top: 5%;
    right: 10%;
`;

export const CardFooter = styled.div`
    width: 100px;
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

export const OptionsButton = styled(IoIosArrowDown)`
    cursor: pointer;
    border-radius: 50%;
    padding: 0.375rem;
    box-sizing: content-box;
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: var(--indigo-100);
    }
`;
