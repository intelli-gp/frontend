import { BsThreeDotsVertical } from 'react-icons/bs';
import styled from 'styled-components';

export const CardContainer = styled.div`
    padding: 1rem;
    width: 100%;
    display: flex;
    gap: 12px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    transition: all 0.25s ease-in-out;
    border-radius: 6px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.01);
    }
`;
export const NoContentHolder = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    width: 100%;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: var(--slate-400);
`;
export const EditIcon = styled(BsThreeDotsVertical)`
    color: var(--slate-400);
    width: 20px;
    height: 20px;
    transition: all 0.2s ease-in-out;

    border-radius: 50%;
    &:hover {
        background-color: var(--indigo-25);
    }
`;
