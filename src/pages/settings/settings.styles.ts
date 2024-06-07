import { motion } from 'framer-motion';
import { IoAddCircle } from 'react-icons/io5';
import styled from 'styled-components';

import Button from '../../components/button/button.component';
import EnhancedImage from '../../components/image/image.component';

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
    margin-top: 1rem;
    color: inherit;
`;

export const AddCard = styled(IoAddCircle)`
    width: 25px;
    height: 25px;

    color: var(--indigo-200);
`;

export const AddCardContainer = styled(Button)`
    padding:6px 8px;
`;

export const PlanButton = styled(Button)`
    width:185px;
`;

export const PayTime = styled.div`
    height: 12px;
    font-size: 0.75em;
    color: var(--slate-100);
    font-weight: 500;
    padding: 0.7rem;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 55px;
    background: var(--slate-400);
    transition: all 0.2s ease-in-out;
    &:hover {
        color: var(--slate-400);
        background: var(--slate-100);
    }
`;

export const NoContentHolder =styled.div`
    display:flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding:1.5rem;
    width:100%;
	font-size: 1.25rem;
line-height: 1.75rem;   
 font-weight: 540;
`

export const QRCodeImg = styled(EnhancedImage)`
    width: 200px;
    aspect-ratio: 1/1;
    margin: 0 auto;
`;

export const QRCodeTextContainer = styled.ul`
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    li {
        font-size: 0.875rem;
        list-style: disc;
    }
`;

export const QRCodeModalButtons = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 1rem;
`;
