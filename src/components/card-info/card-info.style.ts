import { BsThreeDotsVertical } from 'react-icons/bs';
import styled from 'styled-components';

export const CardContainer = styled.div`
    padding: 1rem 0.28rem 1rem 1rem;
    width: 100%;
    display: flex;
    gap: 12px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    margin: 0 10px;
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
