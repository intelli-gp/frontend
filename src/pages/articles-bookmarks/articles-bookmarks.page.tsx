import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import EmptyPagePlaceholder from '../../components/empty-page-placeholder/empty-placeholder.component';
import UpButton from '../../components/up-button/up-button.components';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    // usePrefetch as prefetch,
    useGetBookmarkedArticlesQuery,
} from '../../store';
import { ArticlesSkeleton } from '../explore-articles/explore-articles.page';
import {
    MainContent,
    PageContainer,
} from '../explore-articles/explore-articles.styles';
import { ContentWrapper } from './articles-bookmarks.styles';

const ArticlesBookmarksPage = () => {
    let navigate = useNavigate();
    let headerRef = useRef<HTMLHeadingElement>(null);
    let { data, isLoading } = useGetBookmarkedArticlesQuery({
        limit: 100,
        offset: 0,
    });

    // let prefetchBookmarks = prefetch('getBookmarkedArticles');
    let articles = data?.data?.Results ?? [];

    let PageContent = () => {
        if (isLoading) {
            return <ArticlesSkeleton />;
        } else {
            if (articles?.length === 0) {
                return (
                    <EmptyPagePlaceholder
                        text="No bookmarks found, let's explore some articles!"
                        variant="no-data"
                        button={{
                            text: 'Explore Articles',
                            path: '/app/articles',
                        }}
                    />
                );
            } else if (articles?.length > 0) {
                return (
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
                );
            }
        }
    };

    return (
        <PageContainer className='h-full' {...BetweenPageAnimation}>
            <PageTitle ref={headerRef}>My Bookmarks</PageTitle>
            <ContentWrapper>
                <PageContent />
            </ContentWrapper>
            <UpButton pageHeaderElement={headerRef.current!} />
        </PageContainer>
    );
};

export default ArticlesBookmarksPage;
