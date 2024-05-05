import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import UpButton from '../../components/up-button/up-button.components';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import { PageTitle } from '../../index.styles';
import {
    // usePrefetch as prefetch,
    useGetBookmarkedArticlesQuery,
} from '../../store';
import {
    MainContent,
    PageContainer,
} from '../explore-articles/explore-articles.styles';

const ArticlesBookmarksPage = () => {
    let navigate = useNavigate();
    let headerRef = useRef<HTMLHeadingElement>(null);
    let { data, isLoading } = useGetBookmarkedArticlesQuery({
        limit: 100,
        offset: 0,
    });

    // let prefetchBookmarks = prefetch('getBookmarkedArticles');
    let articles = data?.data?.Results;

    return (
        <PageContainer>
            <PageTitle ref={headerRef}>My Bookmarks</PageTitle>
            <UpButton pageHeaderElement={headerRef.current!} />
            {isLoading ? (
                <Spinner />
            ) : (
                <MainContent>
                    {articles?.map((article) => (
                        <WideArticleItem
                            key={article.ID}
                            {...article}
                            onClick={() =>
                                navigate(`/app/articles/${article.ID}`)
                            }
                        />
                    ))}
                </MainContent>
            )}
        </PageContainer>
    );
};

export default ArticlesBookmarksPage;
