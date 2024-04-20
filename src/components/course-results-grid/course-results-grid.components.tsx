import { Course } from '../../types/course';
import CourseCard from '../course-card/course-card.component';
import { SearchNotFound } from '../search-not-found/search-not-found.component';
import {
    CourseSearchResultsGridContainer,
} from './course-results-grid.styles';

export type CourseResultsGridProps = {
    courseResults: Course[];
};

export const CourseResultsGrid = ({
    courseResults,
}: CourseResultsGridProps) => {
    if (courseResults.length === 0) return <SearchNotFound />;
    return (
        <CourseSearchResultsGridContainer>
            {courseResults.map((course, index) => (
                <CourseCard
                    key={`course-${index}`}
                    title={course.Title}
                    description={course.Headline}
                    instructors={course.Instructors}
                    avgRating={course.AvgRating}
                    numReviews={course.NumReviews}
                    price={course.Price}
                    thumbnailUrl={course.Thumbnail}
                    redirectUrl={course.RedirectUrl}
                />
            ))}
        </CourseSearchResultsGridContainer>
    );
};
