import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ItemContainer = styled(Link)<{ active?: boolean }>`
    display: flex;
    color: white;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease-out;
    border-radius: 0.5rem;
    background-color: ${({ active }) =>
        active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const MainItemContent = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;
