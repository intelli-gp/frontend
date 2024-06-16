import _ from 'lodash';
import { Link } from 'react-router-dom';

import Button from '../button/button.component';
import { Rating } from '../rating/rating.component';
import {
    CardFooter,
    CourseCardContainer,
    CourseDescription,
    CourseInfoWrapper,
    CourseInstructors,
    CoursePriceTag,
    CourseThumbnail,
    CourseTitle,
} from './course-card.styles';

export type CourseCardProps = {
    thumbnailUrl: string;
    redirectUrl: string;
    title: string;
    description: string;
    instructors: string[];
    avgRating: number;
    numReviews: number;
    price: number;
};

export const CourseCard = ({
    thumbnailUrl,
    redirectUrl,
    title,
    description,
    instructors,
    avgRating,
    numReviews,
    price,
}: CourseCardProps) => {
    const courseLink = `${import.meta.env.VITE_UDEMY_URL}${redirectUrl}`;
    return (
        <CourseCardContainer>
            <CourseThumbnail src={thumbnailUrl} alt="Course Thumbnail" />
            <CourseInfoWrapper>
                <CourseTitle title={title} to={courseLink} target="_blank">
                    {_.startCase(title)}
                </CourseTitle>
                <CourseDescription title={description}>
                    {description}
                </CourseDescription>
                <CourseInstructors title={instructors?.join(', ')}>
                    {instructors?.join(', ')}
                </CourseInstructors>
                <Rating value={avgRating} numParticipants={numReviews} />
            </CourseInfoWrapper>
            <CardFooter>
                <Link to={courseLink} target="_blank">
                    <Button
                        title="Enroll In this Course"
                        type="submit"
                        select="secondary"
                    >
                        Enroll now
                    </Button>
                </Link>
                <CoursePriceTag>{price}</CoursePriceTag>
            </CardFooter>
        </CourseCardContainer>
    );
};

export default CourseCard;
