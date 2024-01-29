import { FaPlus } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import { useGetArticlesQuery } from '../../store';
import { ReceivedArticle } from '../../types/article';
import { Response } from '../../types/response';
import { PageContainer, SearchBarContainer } from './explore-articles.styles';
import Spinner from '../../components/Spinner';

const ExploreArticlesPage = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetArticlesQuery();
    const articles = (data as unknown as Response)?.data ?? [];
    return isLoading ? (
        <Spinner />
    ) : (
        <PageContainer>
            <div className="flex w-full items-center gap-2">
                <SearchBarContainer>
                    <LuSearch />
                    <input
                        className="border-none outline-none focus-visible:outline-none flex-1"
                        placeholder="search articles..."
                    />
                </SearchBarContainer>

                <Link to="create">
                    <Button type="button" className="rounded-full">
                        <FaPlus size={12} className="mr-1" /> Create
                    </Button>
                </Link>
            </div>
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
