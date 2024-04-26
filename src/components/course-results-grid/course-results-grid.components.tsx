import { Course } from '../../types/course';
import CourseCard from '../course-card/course-card.component';
import EmptyPagePlaceholder from '../empty-page-placeholder/empty-placeholder.component';
import { CourseSearchResultsGridContainer } from './course-results-grid.styles';

export type CourseResultsGridProps = {
    courseResults: Course[];
};

export const CourseResultsGrid = ({
    courseResults,
}: CourseResultsGridProps) => {
    if (courseResults.length === 0)
        return (
            <EmptyPagePlaceholder
                variant={'empty-search'}
                text={'no results found!\ntry some other keywords.'}
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
