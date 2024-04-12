import { BsThreeDotsVertical } from 'react-icons/bs';
import styled from 'styled-components';

export const CardContainer = styled.div`
padding:1rem;
width: 240px;
height: 182.86px;
border-radius: 8px;
display: flex;
gap:12px;
flex-direction: column;
justify-content:space-between;
align-items: flex-start;
position: relative;
    box-shadow: var(--gray-shadow);
    margin: 0 10px;
`;

export const EditIcon = styled(BsThreeDotsVertical)`  
    color: var(--slate-400);
    width: 20px;
    height: 20px;
`;
