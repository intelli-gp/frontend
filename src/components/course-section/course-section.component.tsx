import { useNavigate } from 'react-router-dom';

import { usePrefetchCourse } from '../../store/apis/coursesApi';
import { Course } from '../../types/course';
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
};

export const CourseSection = ({
    courses,
    sectionTitle,
}: CourseSectionProps) => {
    const navigate = useNavigate();

    const prefetchCategory = usePrefetchCourse('searchCourses');
    const prefetchRecommendedCourses = usePrefetchCourse(
        'getRecommendedCourses',
    );

    const redirectHandler = () => {
        const encodedSectionTitle = encodeURIComponent(sectionTitle);
        const cleanUrl = `/app/courses/search?query=${encodedSectionTitle}&category=${encodedSectionTitle}&limit=24&offset=1`;
        navigate(cleanUrl);
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

    return (
        <CourseSectionContainer>
            <CourseSectionHeader>
                <CourseSectionTitle>{sectionTitle}</CourseSectionTitle>
                <RedirectText
                    onClick={redirectHandler}
                    onMouseEnter={onMoreFromCategoryHover}
                >
                    More from {sectionTitle}
                </RedirectText>
            </CourseSectionHeader>
            {courses?.length === 0 ? (
                <CourseSectionTitle>No courses found</CourseSectionTitle>
            ) : (
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
            )}
        </CourseSectionContainer>
    );
};
