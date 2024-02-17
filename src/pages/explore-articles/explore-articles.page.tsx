import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import { PageTitle } from '../../index.styles';
import { useGetArticlesQuery } from '../../store';
import { ReceivedArticle } from '../../types/article';
import { Response } from '../../types/response';
import { PageContainer } from './explore-articles.styles';

const ExploreArticlesPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const { data, isLoading } = useGetArticlesQuery();
    const articles = (data as unknown as Response)?.data ?? [];

    const handleChangeSearchValue = (value: string) => {
        setSearchValue(value);
        // Todo: filter the articles based on the search value
    };

    const handleCreateButtonClick = () => {
        navigate('/app/articles/create');
    };

    return isLoading ? (
        <Spinner />
    ) : (
        <PageContainer>
            <PageTitle className="text-center">Explore Articles</PageTitle>
            <ExplorePageHeader
                searchValue={searchValue}
                onSearchValueChange={handleChangeSearchValue}
                onCreateButtonClick={handleCreateButtonClick}
            />
            {articles.map((article: ReceivedArticle) => {
                return (
                    <WideArticleItem
                        {...article}
                        onClick={() => navigate(`/app/articles/${article.ID}`)}
                    />
                );
            })}
        </PageContainer>
    );
};

export default ExploreArticlesPage;
