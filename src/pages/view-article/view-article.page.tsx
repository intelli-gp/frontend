import MDEditor from '@uiw/react-md-editor';
import { CiBookmark, CiStar } from 'react-icons/ci';
import { FiPlus } from 'react-icons/fi';
import { IoShareSocial } from 'react-icons/io5';
import { SlOptions } from 'react-icons/sl';
import { useParams } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { TagContainer } from '../../components/tag/tag.styles';
import { useGetArticleQuery } from '../../store';
import { ArticleSectionType, ReceivedArticle } from '../../types/article.d';
import { Response } from '../../types/response';
import {
    ArticleBodyContainer,
    ArticleCoverImage,
    ArticleCoverImageContainer,
    ArticleImageSection,
    ArticleToolbar,
    AuthorDataContainer,
    AuthorMoreInfoContainer,
    AuthorProfileImage,
    PageContainer,
    SuggestedArticlesContainer,
} from './view-article.styles';

const ViewArticlePage = () => {
    const { articleId } = useParams();

    if (!articleId) {
        return <div>Article not found</div>;
    }

    const { data, isLoading } = useGetArticleQuery(parseInt(articleId));
    const article: ReceivedArticle = (data as unknown as Response)?.data;

    return isLoading ? (
        <Spinner />
    ) : (
        <PageContainer>
            <ArticleCoverImageContainer>
                <ArticleCoverImage
                    src={article?.coverImageUrl ?? defaultCoverImage}
                />

                <AuthorDataContainer>
                    <AuthorProfileImage
                        src={article?.author.image ?? defaultUserImage}
                        alt="author profile image"
                    />
                    <div>
                        <p className="text-md font-black text-[var(--gray-800)]">
                            {article?.author.fullName}
                        </p>
                        <p className="text-xs text-[var(--gray-700)]">
                            {article?.updatedAt &&
                                new Date(article.updatedAt).toDateString()}
                        </p>
                    </div>

                    <Button
                        type="button"
                        className="text-xs !px-4 !py-2 ml-auto !rounded-full"
                        select="primary700"
                    >
                        <FiPlus size={16} className="mr-1" />
                        Follow
                    </Button>
                </AuthorDataContainer>
            </ArticleCoverImageContainer>

            <ArticleBodyContainer data-color-mode="light">
                <h1 className="text-5xl font-black text-[var(--gray-700)] text-center tracking-tight">
                    {article?.title}
                </h1>

                {/* Article Tags */}
                <div className="flex gap-2 items-center justify-center">
                    {article?.tags.map((tag) => {
                        return (
                            <TagContainer key={tag} size="sm">
                                {tag}
                            </TagContainer>
                        );
                    })}
                </div>

                <ArticleToolbar className="flex justify-between">
                    <div className="flex gap-4">
                        <CiStar size={24} className="text-[var(--gray-600)]" />
                        <IoShareSocial
                            size={24}
                            className="text-[var(--gray-600)]"
                        />
                    </div>
                    <div className="flex gap-4">
                        <CiBookmark
                            size={24}
                            className="text-[var(--gray-600)]"
                        />
                        <SlOptions
                            size={24}
                            className="text-[var(--gray-600)]"
                        />
                    </div>
                </ArticleToolbar>

                {/* Article sections */}
                {article?.sections.map((section, index) => {
                    if (section.contentType === ArticleSectionType.Image) {
                        return (
                            <ArticleImageSection
                                key={index}
                                src={section.value}
                                alt="article section"
                            />
                        );
                    } else if (
                        section.contentType === ArticleSectionType.Markdown
                    ) {
                        return <MDEditor.Markdown source={section.value} />;
                    }
                })}

                <hr />

                <AuthorMoreInfoContainer>
                    <div className="flex justify-between items-center w-full">
                        <AuthorProfileImage
                            src={article?.author.image ?? defaultUserImage}
                        />
                        <Button
                            select="primary700"
                            type="button"
                            className="text-sm !px-4 !py-2 !rounded-full"
                        >
                            <FiPlus size={20} className="mr-1" />
                            Follow
                        </Button>
                    </div>
                    <p className="text-3xl font-bold text-[var(--gray-700)]">
                        Written by {article?.author.fullName}
                    </p>
                </AuthorMoreInfoContainer>

                <hr />

                <SuggestedArticlesContainer>
                    <p className="font-bold text-xl text-[var(--gray-800)]">
                        More from the same preference and author{' '}
                    </p>
                </SuggestedArticlesContainer>
            </ArticleBodyContainer>
        </PageContainer>
    );
};

export default ViewArticlePage;
