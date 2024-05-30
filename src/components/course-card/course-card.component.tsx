import _ from 'lodash';

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
    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    const handleLinkRedirect = () => {
        openInNewTab(`${import.meta.env.VITE_UDEMY_URL}${redirectUrl}`);
    };
    return (
        <CourseCardContainer>
            <CourseThumbnail src={thumbnailUrl} alt="Course Thumbnail" />
            <CourseInfoWrapper>
                <CourseTitle title={title} onClick={handleLinkRedirect}>
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
                <Button
                    title="Enroll In this Course"
                    type="submit"
                    select="secondary"
                    onClick={handleLinkRedirect}
                >
                    Enroll now
                </Button>
                <CoursePriceTag>{price}</CoursePriceTag>
            </CardFooter>
        </CourseCardContainer>
    );
};

export default CourseCard;
