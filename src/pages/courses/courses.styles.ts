import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CoursesPageContainer = styled(motion.div)`
    padding: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
`;

export const CoursePageHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;

export const CourseSectionsWrapper = styled.div`
    width: min(100%, 1200px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
`;
