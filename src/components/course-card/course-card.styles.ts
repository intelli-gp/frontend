import styled from 'styled-components';

import EnhancedImage from '../image/image.component';

export const CourseCardContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 320px;
    max-width: 320px;
    height: 500px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
`;

// upper part of the card

export const CourseThumbnail = styled(EnhancedImage)`
    width: 100%;
    object-fit: cover;
    height: 200px;
    border-radius: 5px 5px 0 0;
`;

// middle part of the card

export const CourseInfoWrapper = styled.div`
    display: flex;
    height: calc(100% - 270px);
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem 1rem;
`;

export const CourseTitle = styled.h2`
    font-weight: 600;
    font-size: 1.3rem;
`;

export const CourseDescription = styled.p`
    font-size: 1rem;
    color: var(--gray-700);
    line-height: 1.5;
`;

export const CourseInstructor = styled.p`
    font-size: 0.8rem;
    color: var(--gray-600);
`;

// lower part of the card

export const CardFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
    position: absolute;
    bottom: 0;
`;
export const CoursePriceTag = styled.div`
    font-size: 1.3rem;
    font-weight: 600;
`;
