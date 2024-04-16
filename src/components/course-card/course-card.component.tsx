import _ from 'lodash';

import Button from '../button/button.component';
import { Rating } from '../rating/rating.component';
import {
    CardFooter,
    CourseCardContainer,
    CourseDescription,
    CourseInfoWrapper,
    CourseInstructor,
    CoursePriceTag,
    CourseThumbnail,
    CourseTitle,
} from './course-card.styles';

export type CourseCardProps = {
    thumbnailUrl: string;
    title: string;
    description: string;
    instructor: string;
    avgRating: number;
    numStudents: number;
    price: number;
    currency?: string;
};

export const CourseCard = ({
    thumbnailUrl,
    title,
    description,
    instructor,
    avgRating,
    numStudents,
    price,
    currency = '$',
}: CourseCardProps) => {
    return (
        <CourseCardContainer>
            <CourseThumbnail src={thumbnailUrl} alt='Course Thumbnail'/>
            <CourseInfoWrapper>
                <CourseTitle>{_.startCase(title)}</CourseTitle>
                <CourseDescription>{description}</CourseDescription>
                <CourseInstructor>{instructor}</CourseInstructor>
                <Rating value={avgRating} numParticipants={numStudents} />
            </CourseInfoWrapper>
            <CardFooter>
                <Button type="submit" select="secondary">
                    Enroll now
                </Button>
                <CoursePriceTag>{`${price} ${currency}`}</CoursePriceTag>
            </CardFooter>
        </CourseCardContainer>
    );
};

export default CourseCard;
