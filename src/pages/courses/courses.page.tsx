import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import { CourseSection } from '../../components/course-section/course-section.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { BetweenPageAnimation } from '../../index.styles';
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
    CoursePageTitle,
    CourseSectionsWrapper,
    CoursesPageContainer,
} from './courses.styles';

export const CoursesPage = () => {
    const navigate = useNavigate();

    const { searchTerm } = useSelector(
        (state: RootState) => state.appState.coursesPage,
    );
    const dispatch = useDispatch();

    const { data: recommendationData, isLoading: isRecommendationsLoading } =
        useGetRecommendedCoursesQuery({});

    const { data: previewData, isLoading: isPreviewLoading } =
        useGetCoursesPreviewQuery();

    const recommendedCourses = recommendationData?.data?.Results as Course[];
    const previewCourses = previewData?.data as CategoryWithCourses[];

    if (isRecommendationsLoading || isPreviewLoading) return <Spinner />;
    console.log({ previewCourses });

    const onSearchValueChangeHandler = (value: string) => {
        dispatch(changeCoursesPageSearchQuery(value));
    };
    const onSearchSubmitHandler = (value: string) => {
        dispatch(changeCoursesPageSearchInitiated(true));
        dispatch(changeCoursesPageSearchQuery(value));
        navigate(`/app/courses/search?query=${encodeURIComponent(value)}`);
    };

    return (
        <CoursesPageContainer {...BetweenPageAnimation}>
            <CoursePageHeader>
                <CoursePageTitle>Explore Courses</CoursePageTitle>
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
