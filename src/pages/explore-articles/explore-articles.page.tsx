import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Skeleton from '../../components/Skeleton';
import EmptyPagePlaceholder from '../../components/empty-page-placeholder/empty-placeholder.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import BackendSupportedPagination from '../../components/pagination/pagination.components';
import UpButton from '../../components/up-button/up-button.components';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    changeArticlesPagePaginationPageNumber,
    changeArticlesPageSearchInitiated,
    changeArticlesPageSearchQuery,
} from '../../store';
import { useLazyFetchGeneralArticlesRecommendationQuery } from '../../store/apis/recommendationApi';
import {
    useLazyArticlesSearchQuery,
    usePrefetchSearch,
} from '../../store/apis/searchApi';
import { ReceivedArticle } from '../../types/article';
import { errorToast } from '../../utils/toasts';
import {
    MainContent,
    PageContainer,
    SmallTitle,
} from './explore-articles.styles';

const PAGE_LIMIT = 15;

const ExploreArticlesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const headerRef = useRef<HTMLDivElement>(null);

    const { searchTerm, searchInitiated, paginationPageNumber } = useSelector(
        (state: RootState) => state.appState.articlesPage,
    );

    const prefetchSearch = usePrefetchSearch('articlesSearch');
    const [triggerSearch, { data, isFetching: searchIsFetching }] =
        useLazyArticlesSearchQuery();
    const { Results: articles, NumPages } = data?.data ?? {};

    const [
        triggerArticleRecommendation,
        {
            data: _articleRecommendation,
            isFetching: articleRecommendationsFetching,
        },
    ] = useLazyFetchGeneralArticlesRecommendationQuery();

    const recommendedArticles = _articleRecommendation?.data
        ?.Results as ReceivedArticle[];

    const searchHandler = async (searchTerm: string) => {
        if (searchTerm.trim().length === 0) return;
        try {
            await triggerSearch({ searchTerm, limit: PAGE_LIMIT }).unwrap();
            dispatch(changeArticlesPageSearchInitiated(true));
        } catch (error) {
            errorToast('Error occurred while searching.');
            console.error(error);
        }
    };

    const handleChangeSearchValue = (value: string) => {
        dispatch(changeArticlesPageSearchQuery(value));
    };

    const handleCreateButtonClick = () => {
        navigate('/app/articles/create');
    };

    const onPageHover = async (page: number) => {
        if (NumPages ?? 0 < page) {
            return;
        }

        prefetchSearch({
            searchTerm,
            limit: PAGE_LIMIT,
            offset: (page - 1) * PAGE_LIMIT,
        });
    };

    const onPageChange = async (page: number) => {
        dispatch(changeArticlesPagePaginationPageNumber(page));

        await triggerSearch({
            searchTerm: searchTerm,
            limit: PAGE_LIMIT,
            offset: (page - 1) * PAGE_LIMIT,
        }).unwrap();

        if (NumPages ?? 0 > page) {
            onPageHover(page + 1); // prefetch next page
        }
    };

    const PageContent = () => {
        if (searchIsFetching || articleRecommendationsFetching) {
            return <ArticlesSkeleton />;
        }
        if (searchInitiated) {
            if (articles?.length === 0) {
                return (
                    <EmptyPagePlaceholder
                        variant="empty-search"
                        text="No search results found, try some other keywords!"
                    />
                );
            } else {
                return (
                    <MainContent>
                        {articles?.map((article) => {
                            return (
                                <WideArticleItem
                                    key={article.ID}
                                    {...article}
                                    onClick={() =>
                                        navigate(`/app/articles/${article.ID}`)
                                    }
                                />
                            );
                        })}
                    </MainContent>
                );
            }
        } else {
            if (recommendedArticles?.length === 0) {
                return (
                    <EmptyPagePlaceholder
                        variant="no-data"
                        text={`No article suggestions found!, try to search for articles`}
                    />
                );
            } else {
                return (
                    <MainContent>
                        {recommendedArticles?.map((article) => {
                            return (
                                <WideArticleItem
                                    key={article.ID}
                                    {...article}
                                    onClick={() =>
                                        navigate(`/app/articles/${article.ID}`)
                                    }
                                />
                            );
                        })}
                    </MainContent>
                );
            }
        }
    };

    useEffect(() => {
        if (!searchInitiated || searchTerm.trim().length === 0) {
            triggerArticleRecommendation({ limit: PAGE_LIMIT });
            dispatch(changeArticlesPageSearchInitiated(false));
        } else {
            searchHandler(searchTerm);
        }
    }, []);

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageTitle className="text-center" ref={headerRef}>
                Explore Articles
            </PageTitle>
            <ExplorePageHeader
                searchValue={searchTerm}
                onSearchValueChange={handleChangeSearchValue}
                onCreateButtonClick={handleCreateButtonClick}
                searchHandler={searchHandler}
                suggestionsType={'article'}
                placeholder="Search articles..."
            />
            <UpButton pageHeaderElement={headerRef.current!} />
            <SmallTitle>
                {searchInitiated ? 'search results' : 'suggested articles'}
            </SmallTitle>
            <PageContent />
            {searchInitiated && (
                <BackendSupportedPagination
                    pageHeaderElement={headerRef.current!}
                    numOfPages={NumPages ?? 1}
                    pageSize={PAGE_LIMIT}
                    currentPage={paginationPageNumber}
                    onPageChange={onPageChange}
                    onPageHover={onPageHover}
                    siblingCount={1}
                />
            )}
        </PageContainer>
    );
};

export const ArticlesSkeleton = () => {
    return (
        <MainContent>
            {[...Array(10)].map((_, index) => (
                <Skeleton
                    key={index}
                    className={'w-[min(800px, 100%)] h-[215px] rounded-[1rem]'}
                />
            ))}
        </MainContent>
    );
};

export default ExploreArticlesPage;
