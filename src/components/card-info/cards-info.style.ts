import { SlPlus } from 'react-icons/sl';
import styled from 'styled-components';

import Button from '../button/button.component';

export const CardsContainer = styled.div`
    flex-wrap: wrap;
    margin: 0 auto;
    width: 100%;
    display: flex;
    gap: 1.5rem;
    padding: 2rem 1rem;
    justify-content: center;
`;

export const CardContainer = styled.div`
    width: 325px;
    height: 122.5px;
    padding: 1.5rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    transition: all 0.25s ease-in-out;
    border-radius: 1rem;
    background: hsla(233, 100%, 90%, 1);
    background: linear-gradient(
        90deg,
        hsla(233, 100%, 90%, 1) 0%,
        hsla(0, 0%, 89%, 1) 100%
    );
    background: -moz-linear-gradient(
        90deg,
        hsla(233, 100%, 90%, 1) 0%,
        hsla(0, 0%, 89%, 1) 100%
    );
    background: -webkit-linear-gradient(
        90deg,
        hsla(233, 100%, 90%, 1) 0%,
        hsla(0, 0%, 89%, 1) 100%
    );
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#CAD0FF", endColorstr="#E3E3E3", GradientType=1 );
`;

export const EditButton = styled(Button)`
    background-color: transparent;
    color: inherit;
    border: none;
    transition: all 0.2s ease-in-out;
    padding: 0.5rem;
    box-sizing: content-box;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export const CardNumber = styled.p`
    font-weight: 500;
    font-size: 0.875rem;
`;

export const DefaultBadge = styled.span`
    background-color: rgba(0, 0, 0, 0.1);
    color: var(--gray-700);
    margin-left: auto;
    border-radius: 999px;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    font-size: 0.65rem;
    line-height: 1;
`;

export const ExpireDate = styled.time`
    color: var(--gray-600);
    font-size: 0.875rem;
`;

export const AddNewCardButton = styled.button`
    height: 122.5px;
    width: 325px;
    display: flex;
    flex-shrink: 0;
    transition: all 0.25s ease-in-out;
    border-radius: 1rem;
    box-shadow: 0 0 5px 2.5px rgba(0, 0, 0, 0.075);
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: var(--indigo-50);
        svg {
            color: var(--gray-500);
        }
    }
`;

export const AddNewCardText = styled.p`
    width: 80%;
    margin: auto;
    color: var(--gray-600);
`;

export const AddNewCardIcon = styled(SlPlus)`
    height: 36px;
    width: 36px;
    color: var(--gray-400);
    margin: auto;
    transition: all 0.2s ease-in-out;
`;
