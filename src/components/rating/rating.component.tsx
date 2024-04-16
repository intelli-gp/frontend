import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import {
    RatingContainer,
    RatingParticipants,
    RatingStar,
    RatingStarsContainer,
    RatingValue,
} from './rating.styles';

export type RatingProps = {
    value: number;
    numParticipants: number;
    referenceValue?: number;
};

const appropriateRatingStar = (
    index: number,
    value: number,
    referenceValue: number,
) => {
    if (value >= index) {
        return FaStar;
    } else if (value - index >= -0.7 && value < referenceValue) {
        return FaStarHalfAlt;
    } else {
        return FaRegStar;
    }
};

export const Rating = ({
    value,
    numParticipants,
    referenceValue = 5,
}: RatingProps) => {
    return (
        <RatingContainer>
            <RatingValue>
                {value < referenceValue
                    ? value.toPrecision(referenceValue.toString().length + 1)
                    : referenceValue}
            </RatingValue>
            <RatingStarsContainer>
                {[...Array(5)].map((_, index) => (
                    <RatingStar
                        key={index}
                        as={appropriateRatingStar(
                            index + 1,
                            value,
                            referenceValue,
                        )}
                    />
                ))}
            </RatingStarsContainer>
            <RatingParticipants>({numParticipants})</RatingParticipants>
        </RatingContainer>
    );
};
