import { useDispatch } from 'react-redux';

import {
    changeCoursesPageSearchInitiated,
    changeCoursesPageSearchQuery,
} from '../../store';
import { usePrefetchCourse } from '../../store/apis/coursesApi';
import { Course } from '../../types/course';
import Skeleton from '../Skeleton';
import CourseCard from '../course-card/course-card.component';
import { SwiperSlider } from '../swiper/swiper-slider.component';
import {
    CourseSectionContainer,
    CourseSectionHeader,
    CourseSectionTitle,
    RedirectText,
} from './course-section.styles';

export type CourseSectionProps = {
    sectionTitle: string;
    /**
     * Courses available in this section
     */
    courses: Course[];

    /**
     * Whether the courses are still loading
     */
    isLoading?: boolean;
};

// Suggestion: move this into search courses page as it is only used there.

export const CourseSection = ({
    courses,
    sectionTitle,
    isLoading,
}: CourseSectionProps) => {
    const dispatch = useDispatch();

    const prefetchCategory = usePrefetchCourse('searchCourses');
    const prefetchRecommendedCourses = usePrefetchCourse(
        'getRecommendedCourses',
    );

    const redirectHandler = () => {
        dispatch(changeCoursesPageSearchInitiated(true));
        dispatch(changeCoursesPageSearchQuery(sectionTitle));
    };

    const onMoreFromCategoryHover = () => {
        if (sectionTitle === 'Recommended For You') {
            prefetchRecommendedCourses({
                limit: 24,
                offset: 1,
            });
        } else {
            prefetchCategory({
                query: sectionTitle,
                category: sectionTitle,
                limit: 24,
                offset: 1,
            });
        }
    };

    /**
     * Returns the main content of the course section with a skeleton loader if the courses are still loading
     */
    const MainContent = () => {
        if (isLoading) {
            return (
                <SwiperSlider>
                    {Array(10)
                        .fill(0)
                        .map(() => (
                            <Skeleton
                                times={1}
                                className="w-[320px] h-[500px]"
                            />
                        ))}
                </SwiperSlider>
            );
        }

        if (courses.length === 0) {
            return <CourseSectionTitle>No courses found</CourseSectionTitle>;
        } else {
            return (
                <SwiperSlider>
                    {courses?.map((course, index) => (
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
                </SwiperSlider>
            );
        }
    };

    /**
     * Returns the title of the course section with a skeleton loader if the courses are still loading
     */
    const Title = () => {
        if (isLoading) {
            return LargeTitleSkeleton;
        } else {
            return <CourseSectionTitle>{sectionTitle}</CourseSectionTitle>;
        }
    };

    /**
     *  Returns the more link of the course section with a skeleton loader if the courses are still loading
     */
    const MoreLink = () => {
        if (isLoading) {
            return SmallTitleSkeleton;
        } else {
            return (
                <RedirectText
                    onClick={redirectHandler}
                    onMouseEnter={onMoreFromCategoryHover}
                    to={sectionRedirectUrl}
                >
                    More from {sectionTitle}
                </RedirectText>
            );
        }
    };

    const LargeTitleSkeleton = (
        <Skeleton times={1} className="w-[150px] h-[30px] rounded-full" />
    );

    const SmallTitleSkeleton = (
        <Skeleton times={1} className="w-[100px] h-[20px] rounded-full m-0" />
    );

    const encodedSectionTitle = encodeURIComponent(sectionTitle);
    const sectionRedirectUrl = `/app/courses/search?query=${encodedSectionTitle}&category=${encodedSectionTitle}&limit=24&offset=1`;

    return (
        <CourseSectionContainer>
            <CourseSectionHeader>
                <Title />
                <MoreLink />
            </CourseSectionHeader>
            <MainContent />
        </CourseSectionContainer>
    );
};
