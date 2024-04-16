import { CourseCardProps } from '../../components/course-card/course-card.component';
import { CourseSection } from '../../components/course-section/course-section.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import {
    CoursePageHeader,
    CoursePageTitle,
    CourseSectionsWrapper,
    CoursesPageContainer,
} from './courses.styles';

const courseDummyData: CourseCardProps[] = [
    {
        title: 'Mastering React',
        description: 'Learn how to build a React application from scratch',
        instructor: 'John Doe',
        avgRating: 3.6,
        numStudents: 1000,
        price: 100,
        currency: '$',
        thumbnailUrl: 'https://via.placeholder.com/350x200',
    },
    {
        title: 'Mastering React',
        description: 'Learn how to build a React application from scratch',
        instructor: 'John Doe',
        avgRating: 5.5,
        numStudents: 1000,
        price: 100,
        currency: '$',
        thumbnailUrl: 'https://via.placeholder.com/350x200',
    },
    {
        title: 'Mastering React',
        description: 'Learn how to build a React application from scratch',
        instructor: 'John Doe',
        avgRating: 4.5,
        numStudents: 1000,
        price: 100,
        currency: '$',
        thumbnailUrl: 'https://via.placeholder.com/350x200',
    },
    {
        title: 'Mastering React',
        description: 'Learn how to build a React application from scratch',
        instructor: 'John Doe',
        avgRating: 4.5,
        numStudents: 1000,
        price: 100,
        currency: '$',
        thumbnailUrl: 'https://via.placeholder.com/350x200',
    },
    {
        title: 'Mastering React',
        description: 'Learn how to build a React application from scratch',
        instructor: 'John Doe',
        avgRating: 4.5,
        numStudents: 1000,
        price: 100,
        currency: '$',
        thumbnailUrl: 'https://via.placeholder.com/350x200',
    },
    {
        title: 'Mastering React',
        description: 'Learn how to build a React application from scratch',
        instructor: 'John Doe',
        avgRating: 4.5,
        numStudents: 1000,
        price: 100,
        currency: '$',
        thumbnailUrl: 'https://via.placeholder.com/350x200',
    },
    {
        title: 'Mastering React',
        description: 'Learn how to build a React application from scratch',
        instructor: 'John Doe',
        avgRating: 4.5,
        numStudents: 1000,
        price: 100,
        currency: '$',
        thumbnailUrl: 'https://via.placeholder.com/350x200',
    },
    {
        title: 'Mastering React',
        description: 'Learn how to build a React application from scratch',
        instructor: 'John Doe',
        avgRating: 4.5,
        numStudents: 1000,
        price: 100,
        currency: '$',
        thumbnailUrl: 'https://via.placeholder.com/350x200',
    },
];

export const CoursesPage = () => {
    return (
        <CoursesPageContainer>
            <CoursePageHeader>
                <CoursePageTitle>Explore Courses</CoursePageTitle>
                <ExplorePageHeader
                    placeholder="Search Courses..."
                    WithoutButton={true}
                />
            </CoursePageHeader>
            <CourseSectionsWrapper>
                <CourseSection
                    courses={courseDummyData}
                    sectionTitle="Recommended For You"
                />
                <CourseSection
                    courses={courseDummyData}
                    sectionTitle="Front End Development"
                />
                                <CourseSection
                    courses={courseDummyData}
                    sectionTitle="Back End Development"
                />
            </CourseSectionsWrapper>
        </CoursesPageContainer>
    );
};
