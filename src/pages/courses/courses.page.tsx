import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CourseSection } from '../../components/course-section/course-section.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    changeCoursesPageSearchInitiated,
    changeCoursesPageSearchQuery,
} from '../../store';
import {
    useGetCoursesPreviewQuery,
    useGetRecommendedCoursesQuery,
} from '../../store/apis/coursesApi';
import { CategoryWithCourses, Course } from '../../types/course';
import {
    CoursePageHeader,
    CourseSectionsWrapper,
    CoursesPageContainer,
} from './courses.styles';

export const CoursesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { searchTerm } = useSelector(
        (state: RootState) => state.appState.coursesPage,
    );

    const { data: recommendationData, isLoading: isRecommendationsLoading } =
        useGetRecommendedCoursesQuery({});

    const { data: previewData, isLoading: isPreviewLoading } =
        useGetCoursesPreviewQuery();

    const recommendedCourses = recommendationData?.data?.Results as Course[];
    const previewCourses = previewData?.data as CategoryWithCourses[];

    const onSearchValueChangeHandler = (value: string) => {
        dispatch(changeCoursesPageSearchQuery(value));
    };

    const onSearchSubmitHandler = (value: string) => {
        dispatch(changeCoursesPageSearchInitiated(true));
        dispatch(changeCoursesPageSearchQuery(value));
        navigate(`/app/courses/search?query=${encodeURIComponent(value)}`);
    };

    useEffect(() => {
        document.title = 'Explore Courses | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    /**
     * Provides a preview of the courses available in the categories with skeleton loading.
     */
    const PreviewCourses = () => {
        if (previewCourses) {
            return previewCourses.map((category, index) => (
                <CourseSection
                    key={`course-section-category-${category}-${index}`}
                    courses={category.Courses}
                    sectionTitle={category.Category}
                    isLoading={isPreviewLoading}
                />
            ));
        } else {
            return Array(3)
                .fill(0)
                .map((item) => (
                    <CourseSection
                        key={item}
                        courses={[]}
                        sectionTitle={''}
                        isLoading={isPreviewLoading}
                    />
                ));
        }
    };

    return (
        <CoursesPageContainer {...BetweenPageAnimation}>
            <CoursePageHeader>
                <PageTitle className="text-center">Explore Courses</PageTitle>
                <ExplorePageHeader
                    placeholder="Search Courses..."
                    WithoutButton={true}
                    searchValue={searchTerm}
                    onSearchValueChange={onSearchValueChangeHandler}
                    searchHandler={onSearchSubmitHandler}
                />
            </CoursePageHeader>
            <CourseSectionsWrapper>
                <CourseSection
                    courses={recommendedCourses}
                    sectionTitle="Recommended For You"
                    isLoading={isRecommendationsLoading}
                />
                <PreviewCourses />
            </CourseSectionsWrapper>
        </CoursesPageContainer>
    );
};

export default CoursesPage;
