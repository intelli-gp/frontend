import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import { CourseSection } from '../../components/course-section/course-section.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { BetweenPageAnimation } from '../../index.styles';
import {
    useGetCoursesPreviewQuery,
    useGetRecommendedCoursesQuery,
} from '../../store/apis/coursesApi';
import { CategoryWithCourses, Course } from '../../types/course';
import {
    CoursePageHeader,
    CoursePageTitle,
    CourseSectionsWrapper,
    CoursesPageContainer,
} from './courses.styles';

export const CoursesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const { data: recommendationData, isLoading: isRecommendationsLoading } =
        useGetRecommendedCoursesQuery({});

    const { data: previewData, isLoading: isPreviewLoading } =
        useGetCoursesPreviewQuery();

    const recommendedCourses = recommendationData?.data?.Results as Course[];
    const previewCourses = previewData?.data as CategoryWithCourses[];

    if (isRecommendationsLoading || isPreviewLoading) return <Spinner />;
    console.log({ previewCourses });

    const searchSubmitHandler = (query: string) => {
        navigate(`/app/courses/search?query=${encodeURIComponent(query)}`);
    };

    return (
        <CoursesPageContainer {...BetweenPageAnimation}>
            <CoursePageHeader>
                <CoursePageTitle>Explore Courses</CoursePageTitle>
                <ExplorePageHeader
                    placeholder="Search Courses..."
                    WithoutButton={true}
                    searchValue={searchTerm}
                    onSearchValueChange={(value) => setSearchTerm(value)}
                    searchHandler={searchSubmitHandler}
                />
            </CoursePageHeader>
            <CourseSectionsWrapper>
                <CourseSection
                    courses={recommendedCourses}
                    sectionTitle="Recommended For You"
                />
                {previewCourses?.map((category, index) => (
                    <CourseSection
                        key={`course-section-category-${category}-${index}`}
                        courses={category.Courses}
                        sectionTitle={category.Category}
                    />
                ))}
            </CourseSectionsWrapper>
        </CoursesPageContainer>
    );
};

export default CoursesPage;
