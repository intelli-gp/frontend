import styled from 'styled-components';

import EnhancedImage from '../image/image.component';

export const CourseCardContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 320px;
    max-width: 320px;
    height: 500px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 8px 2px;
    border-radius: 5px;

    &:hover {
        background-color: #f9f9f9;
    }
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
    cursor: pointer;
    font-weight: 600;
    font-size: 1.3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const CourseDescription = styled.p`
    font-size: 1rem;
    color: var(--gray-700);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const CourseInstructors = styled.p`
    font-size: 0.8rem;
    color: var(--gray-600);
    white-space: nowrap; /* Prevent text from wrapping to the next line */
    overflow: hidden; /* Hide any overflowing content */
    text-overflow: ellipsis; /* Display an ellipsis (...) when text overflows */
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
