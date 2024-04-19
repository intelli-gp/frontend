import { motion } from 'framer-motion';
import { IoAddCircle } from 'react-icons/io5';
import styled from 'styled-components';

import Button from '../../components/button/button.component';

export const PageContainer = styled(motion.div)`
    min-height: 100vh;
    width: 100%;
    max-width: 1000px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 1.5rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

export const SectionTitle = styled.h2`
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    font-weight: 900;
    opacity: 0.5;
`;

export const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const InlineInputsContainer = styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const EditButton = styled(Button)`
    align-self: end;
    width: 80px;
    height: 35px;
    font-size: 0.875em;
    margin-top: 1rem;
    color: inherit;
`;
export const AddCard = styled(IoAddCircle)`
    width: 25px;
    height: 25px;

    color: var(--indigo-200);
`;
export const AddCardContainer = styled(Button)`

    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: center;
    align-items: center;
border:0px;
width:25%;
gap:8px;
padding:0.7rem 0.5rem;
`;
export const PayTime = styled.div`

height:12px;
font-size: 0.75em;
color:var(--slate-100);
font-weight: 500;
padding: 0.7rem;
text-align: center;
display: inline-flex;
align-items: center;
justify-content: center;
border-radius: 55px;
background:var(--slate-400);
transition: all 0.2s ease-in-out;
&:hover{
    color:var(--slate-400);
    background:var(--slate-100);


}`