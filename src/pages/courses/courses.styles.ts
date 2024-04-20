import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CoursesPageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`;

export const CoursePageTitle = styled.h1`
    user-select: none;
    line-height: 1.25;
    font-weight: 700;
    font-size: 2.5rem;
    letter-spacing: -1.5px;
`;
export const CoursePageHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
`;
export const CourseSectionsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
`;
