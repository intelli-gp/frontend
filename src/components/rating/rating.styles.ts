import { FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';

export const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    * {
        /* border: 1px solid red; */
    }
`;

export const RatingValue = styled.p`
    font-size: 1rem;
`;

// takes a prop with percentage value
export const RatingStarsContainer = styled.div`
    display: flex;
    gap: 0.1rem;
`;

export const RatingStar = styled(FaRegStar)`
    font-size: 1.2rem;
    fill: #fcd53f;
`;

export const RatingParticipants = styled.p`
    font-size: 0.7rem;
    color: var(--gray-600);
`;
