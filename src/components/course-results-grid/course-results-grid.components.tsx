import { Course } from '../../types/course';
import CourseCard from '../course-card/course-card.component';
import EmptyPagePlaceholder from '../empty-page-placeholder/empty-placeholder.component';
import { CourseSearchResultsGridContainer } from './course-results-grid.styles';

export type CourseResultsGridProps = {
    courseResults: Course[];
};

// Suggestion: move this into search courses page as it is only used there.

export const CourseResultsGrid = ({
    courseResults,
}: CourseResultsGridProps) => {
    if (courseResults.length === 0)
        return (
            <EmptyPagePlaceholder
                variant={'empty-search'}
                text={'No results found! try some other keywords.'}
                button={{ text: 'Explore Suggestions', path: '/app/courses' }}
            />
        );
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
