import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner';
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
    const { UserTags } = useSelector((state: RootState) => state.auth.user);

    const prefetchSearch = usePrefetchSearch('articlesSearch');
    const [triggerSearch, { data, isLoading, isFetching }] =
        useLazyArticlesSearchQuery();
    const { Results: articles, NumPages } = data?.data ?? {};

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

    useEffect(() => {
        if (searchInitiated) {
            triggerSearch({ searchTerm, limit: PAGE_LIMIT });
        } else {
            let userTags = UserTags?.join(' ') ?? '';
            triggerSearch({ searchTerm: userTags, limit: PAGE_LIMIT });
        }
    }, []);

    const pageContent = isFetching ? (
        <Spinner />
    ) : (
        <>
            <SmallTitle>
                {searchInitiated ? 'search results' : 'suggested articles'}
            </SmallTitle>
            <MainContent empty={articles && !articles.length}>
                {articles?.map((article: ReceivedArticle) => {
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
        </>
    );

    if (isLoading) {
        return <Spinner />;
    }

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
            {pageContent}
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

export default ExploreArticlesPage;
