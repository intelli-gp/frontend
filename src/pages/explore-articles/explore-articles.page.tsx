import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import { useGetArticlesQuery } from '../../store';
import { ReceivedArticle } from '../../types/article';
import { Response } from '../../types/response';
import { PageContainer } from './explore-articles.styles';

const ExploreArticlesPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const { data, isLoading } = useGetArticlesQuery();
    const [articles, setArticles] = useState<ReceivedArticle[]>([]);
    const receivedData = (data as unknown as Response)?.data ?? [];

    useEffect(() => {
        setArticles(receivedData);
    }, [data]);
    const handleChangeSearchValue = (value: string) => {
        setSearchValue(value);
        const fuseOptions = {
            keys: ['Title'],
            includeScore: true,
            threshold: 0.5,
        };
        const fuse = new Fuse(receivedData, fuseOptions);
        const results = fuse.search(searchValue);
        const filteredSearch =
            value === '' ? receivedData : results.map((result) => result.item);
        setArticles(filteredSearch);
    };

    const handleCreateButtonClick = () => {
        navigate('/app/articles/create');
    };

    return isLoading ? (
        <Spinner />
    ) : (
        <PageContainer {...BetweenPageAnimation}>
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
