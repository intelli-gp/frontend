import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import BackendSupportedPagination from '../../components/pagination/pagination.components';
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

const ExploreArticlesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { searchTerm, searchInitiated, paginationPageNumber } = useSelector(
        (state: RootState) => state.appState.articlesPage,
    );
    const { UserTags } = useSelector((state: RootState) => state.auth.user);

    const prefetchSearch = usePrefetchSearch('articlesSearch');
    const [triggerSearch, { data, isLoading, isFetching }] =
        useLazyArticlesSearchQuery();
    const articles = data?.Results ?? [];

    const searchHandler = async (searchTerm: string) => {
        if (searchTerm.trim().length === 0) return;
        try {
            await triggerSearch({ searchTerm }).unwrap();
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
        if (data?.NumPages ?? 0 > page) {
        }

        prefetchSearch({
            searchTerm,
            limit: data?.LimitPerPage ?? 10,
            offset: page * (data?.LimitPerPage ?? 10),
        });
    };

    const onPageChange = async (page: number) => {
        dispatch(changeArticlesPagePaginationPageNumber(page));

        await triggerSearch({
            searchTerm: searchTerm,
            limit: data?.LimitPerPage ?? 10,
            offset: page * (data?.LimitPerPage ?? 10),
        }).unwrap();

        if (data?.NumPages ?? 0 > page) {
            onPageHover(page + 1);
        }
    };

    useEffect(() => {
        if (searchInitiated) {
            triggerSearch({ searchTerm });
        } else {
            let userTags = UserTags?.join(' ') ?? '';
            triggerSearch({ searchTerm: userTags });
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
                {articles.map((article: ReceivedArticle) => {
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
            <PageTitle className="text-center">Explore Articles</PageTitle>
            <ExplorePageHeader
                searchValue={searchTerm}
                onSearchValueChange={handleChangeSearchValue}
                onCreateButtonClick={handleCreateButtonClick}
                searchHandler={searchHandler}
                suggestionsType={'article'}
                placeholder="Search articles..."
            />
            {pageContent}
            {searchInitiated && (
                <BackendSupportedPagination
                    numOfPages={data?.NumPages ?? 1}
                    pageSize={data?.LimitPerPage ?? 10}
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
