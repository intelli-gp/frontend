import { motion } from 'framer-motion';
import styled from 'styled-components';

import Button from '../../components/button/button.component';
import { IoAddCircle } from "react-icons/io5";

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
export const AddCard =styled(IoAddCircle)`
width: 60px;
height: 60px;

color: var(--indigo-200);

`
export const AddCardContainer =styled.div`
width:200px;
height:182.86px;
background-color:var(--indigo-50);
border-radius:14px;
display:flex; 
flex-direction: column;
justify-items: center;
justify-content: center;
align-items: center;
box-shadow: var(--gray-shadow);
margin:0 10px;
`