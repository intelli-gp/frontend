import CourseCard, { CourseCardProps } from '../course-card/course-card.component';
import { SwiperSlider } from '../swiper/swiper-slider.component';
import { CourseSectionContainer, CourseSectionTitle } from './course-section.styles';

export type CourseSectionProps = {
    sectionTitle: string;
    /**
     * Courses available in this section
     */
    courses: CourseCardProps[];
};

export const CourseSection = ({
    courses,
    sectionTitle
    
}: CourseSectionProps) => {
    return (
        <CourseSectionContainer>
            <CourseSectionTitle>{sectionTitle}</CourseSectionTitle>
            <SwiperSlider>
                {courses.map((course, index) => (
                    <CourseCard
                        key={`course-${index}`}
                        title={course.title}
                        description={course.description}
                        instructor={course.instructor}
                        avgRating={course.avgRating}
                        numStudents={course.numStudents}
                        price={course.price}
                        currency={course.currency}
                        thumbnailUrl={course.thumbnailUrl}
                    />
                ))}
            </SwiperSlider>
        </CourseSectionContainer>
    );
};
