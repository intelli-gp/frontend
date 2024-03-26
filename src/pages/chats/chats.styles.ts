import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled(motion.div)`
margin: 0 auto;
padding: 2rem;
max-width: 800px;
display: flex;
flex-direction: column;
gap: 2rem;
align-items: start;
`

export const Title =styled.div`
    font-size: 3.25rem;
    font-weight: bold;
    color: var(--indigo-950);

`