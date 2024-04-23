import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import { CourseResultsGrid } from '../../components/course-results-grid/course-results-grid.components';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import BackendSupportedPagination from '../../components/pagination/pagination.components';
import UpButton from '../../components/up-button/up-button.components';
import {
    useLazyGetRecommendedCoursesQuery,
    useLazySearchCoursesQuery,
    usePrefetchCourse,
} from '../../store/apis/coursesApi';
import { Course } from '../../types/course';
import { PaginatedResult } from '../../types/pagination';
import { errorToast } from '../../utils/toasts';
import {
    CourseSearchPageHeader,
    CourseSearchPageTitle,
    CourseSearchResultsPageContainer,
} from './course-search-results.styles';

export const CoursesSearchResultsPage = () => {
    const pageHeaderRef = useRef<HTMLDivElement>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchCourses, result] = useLazySearchCoursesQuery();
    const [recommendedCourses, recommendedCoursesResult] =
        useLazyGetRecommendedCoursesQuery();

    const [searchResults, setSearchResults] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageLimit, setPageLimit] = useState(24);

    const prefetchSearchCourses = usePrefetchCourse('searchCourses');
    const prefetechRecommendedCourses = usePrefetchCourse(
        'getRecommendedCourses',
    );

    const scrollToTop = () => {
        pageHeaderRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const searchQuery = searchParams.get('query');
        const searchCategoryParam = searchParams.get('category');
        const pageParam = searchParams.get('offset') || '1';
        const limitParam = searchParams.get('limit') || '24';

        console.log({
            searchQuery,
            searchCategoryParam,
            pageParam,
            limitParam,
        });

        setPage(+pageParam);
        setPageLimit(+limitParam);

        setSearchTerm(searchQuery as string);

        if (searchQuery || searchCategory) {
            switch (searchQuery) {
                case 'Recommended For You': {
                    recommendedCourses({
                        limit: +limitParam,
                        offset: +pageParam,
                    })
                        .unwrap()
                        .then((data) => {
                            const paginatedResults =
                                data?.data as PaginatedResult<Course>;
                            setTotalPages(paginatedResults.NumPages);
                            setSearchResults(paginatedResults.Results);

                            prefetechRecommendedCourses({
                                limit: paginatedResults.LimitPerPage,
                                offset: paginatedResults.NextPageNum,
                            });
                            console.log(data);
                        })
                        .catch((error): void => {
                            errorToast('Error fetching recommended courses');
                            console.error(
                                'Error fetching recommended courses:',
                                error,
                            );
                        });
                    break;
                }
                default: {
                    setSearchCategory(searchCategoryParam as string);
                    searchCourses({
                        query: searchQuery as string,
                        category: searchCategoryParam as string,
                        limit: +pageLimit,
                        offset: +pageParam,
                    })
                        .unwrap()
                        .then((data) => {
                            const paginatedResults =
                                data?.data as PaginatedResult<Course>;
                            setTotalPages(paginatedResults.NumPages);
                            setSearchResults(paginatedResults.Results);
                            setSearchTerm(searchQuery as string);

                            prefetchSearchCourses({
                                query: searchQuery as string,
                                category: searchCategoryParam as string,
                                limit: paginatedResults.LimitPerPage,
                                offset: paginatedResults.NextPageNum,
                            });
                            console.log(data);
                        })
                        .catch((error): void => {
                            errorToast('Error fetching search results');
                            console.error(
                                'Error fetching search results:',
                                error,
                            );
                        });
                    break;
                }
            }
        }
    }, []);

    const searchSubmitHandler = (query: string) => {
        setSearchResults([]);
        setSearchCategory('');
        // TODO: when searching we can adjust the page limit not its default 24
        searchCourses({
            query,
            limit: pageLimit,
            offset: page,
        })
            .unwrap()
            .then((data) => {
                const paginatedResults = data?.data as PaginatedResult<Course>;
                const page = String(paginatedResults?.CurrentPageNum);
                const pageSize = String(paginatedResults?.LimitPerPage);
                setPage(paginatedResults?.CurrentPageNum);
                setTotalPages(paginatedResults?.NumPages);
                setSearchResults(paginatedResults?.Results as Course[]);
                setSearchParams(
                    { query, limit: pageSize, offset: page },
                    { replace: true },
                );
                prefetchSearchCourses({
                    query,
                    limit: paginatedResults?.LimitPerPage,
                    offset: paginatedResults?.NextPageNum,
                });
                console.log(data);
            })
            .catch((error): void => {
                errorToast('Error fetching search results');
                console.error('Error fetching search results:', error);
            });
    };

    const onPageChange = (page: number) => {
        scrollToTop();
        setSearchResults([]);
        setPage(page);

        console.log({ searchTerm });
        if (searchTerm === 'Recommended For You') {
            recommendedCourses({
                limit: pageLimit,
                offset: page,
            })
                .unwrap()
                .then((data) => {
                    const paginatedResults =
                        data?.data as PaginatedResult<Course>;
                    const page = String(paginatedResults?.CurrentPageNum);
                    const pageSize = String(paginatedResults?.LimitPerPage);
                    setPage(paginatedResults?.CurrentPageNum);
                    setTotalPages(paginatedResults?.NumPages);
                    setSearchResults(paginatedResults?.Results);
                    setSearchParams(
                        { limit: pageSize, offset: page },
                        { replace: true },
                    );
                    prefetechRecommendedCourses(
                        {
                            limit: paginatedResults?.LimitPerPage,
                            offset: paginatedResults?.NextPageNum,
                        },
                        {
                            ifOlderThan: 60 * 60,
                        },
                    );
                    console.log(data);
                });
        } else {
            searchCourses({
                query: searchTerm,
                category: searchCategory,
                limit: pageLimit,
                offset: page,
            })
                .unwrap()
                .then((data) => {
                    const paginatedResults =
                        data?.data as PaginatedResult<Course>;
                    const pageSize = String(paginatedResults?.LimitPerPage);
                    const page = String(paginatedResults?.CurrentPageNum);
                    setPage(paginatedResults?.CurrentPageNum);
                    setTotalPages(paginatedResults?.NumPages);
                    setSearchResults(paginatedResults?.Results);
                    setSearchParams(
                        {
                            query: searchTerm,
                            category: searchCategory,
                            limit: pageSize,
                            offset: page,
                        },
                        { replace: true },
                    );
                    prefetchSearchCourses(
                        {
                            query: searchTerm,
                            category: searchCategory,
                            limit: paginatedResults?.LimitPerPage,
                            offset: paginatedResults?.NextPageNum,
                        },
                        {
                            ifOlderThan: 60 * 60,
                        },
                    );
                    console.log(data);
                });
        }
    };

    const onPageHover = (pageNum: number) => {
        if (pageNum >= totalPages) {
            return;
        }

        if (searchTerm === 'Recommended For You') {
            console.log(' Here ');
            prefetechRecommendedCourses(
                {
                    limit: pageLimit,
                    offset: pageNum,
                },
                {
                    ifOlderThan: 60 * 60,
                },
            );
        } else {
            prefetchSearchCourses({
                query: searchTerm,
                category: searchCategory,
                limit: pageLimit,
                offset: pageNum,
            }),
                {
                    ifOlderThan: 60 * 60,
                };
        }
    };

    return (
        <CourseSearchResultsPageContainer>
            <CourseSearchPageHeader ref={pageHeaderRef}>
                <CourseSearchPageTitle>Explore Courses</CourseSearchPageTitle>
                <ExplorePageHeader
                    placeholder="Search Courses..."
                    WithoutButton={true}
                    searchValue={searchTerm as string}
                    onSearchValueChange={(value) => setSearchTerm(value)}
                    searchHandler={searchSubmitHandler}
                />
            </CourseSearchPageHeader>
            {result.isFetching ||
            recommendedCoursesResult.isFetching ||
            result.isLoading ||
            recommendedCoursesResult.isLoading ? (
                <Spinner />
            ) : (
                <CourseResultsGrid courseResults={searchResults} />
            )}
            <BackendSupportedPagination
                currentPage={page}
                onPageChange={onPageChange}
                onPageHover={onPageHover}
                numOfPages={totalPages}
                pageSize={pageLimit}
                siblingCount={1}
            />
            <UpButton
                pageHeaderElement={pageHeaderRef?.current as HTMLDivElement}
            />
        </CourseSearchResultsPageContainer>
    );
};

export default CoursesSearchResultsPage;
