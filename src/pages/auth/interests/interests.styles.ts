import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from '../../../components/button/button.component';

export const PageContainer = styled(motion.div)`
    width: 100%;
    padding: 2rem;
    position: relative;
    display: flex;
    gap: 3rem;
    flex-direction: column;

    @media (max-width: 768px) {
        padding: 4rem 2rem;
    }
    @media (max-width: 426px) {
        padding: 4rem 1rem;
    }
`;
export const SubTitle = styled.h3`
    font-size: 1rem;
    margin-top: -0.25rem;
    text-align: center;
`

export const ContinueButton = styled(Button)`
    width: 100px;
    height: 40px;
`