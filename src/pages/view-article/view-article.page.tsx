import MDEditor from '@uiw/react-md-editor';
import { CiBookmark, CiStar } from 'react-icons/ci';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { IoShareSocial } from 'react-icons/io5';
import { SlOptions } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Button from '../../components/button/button.component';
import Spinner from '../../components/Spinner';
import Tag from '../../components/tag/tag.component';
import { useGetArticleQuery } from '../../store';
import { RootState } from '../../store';
import { ArticleSectionType, ReceivedArticle } from '../../types/article.d';
import { Response } from '../../types/response';
import { ReceivedUser } from '../../types/user';
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
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    if (!articleId) {
        return <div>Article not found</div>;
    }

    const { data, isLoading } = useGetArticleQuery(parseInt(articleId));
    const article: ReceivedArticle = (data as unknown as Response)?.data;
    const isArticleOwner =
        article?.Author?.Username === (user as ReceivedUser)?.Username;

    return isLoading ? (
        <Spinner />
    ) : (
        <PageContainer>
            <ArticleCoverImageContainer>
                <ArticleCoverImage
                    src={article?.CoverImage ?? defaultCoverImage}
                />

                <AuthorDataContainer>
                    <AuthorProfileImage
                        src={article?.Author?.ProfileImage ?? defaultUserImage}
                        alt="author profile image"
                    />
                    <div>
                        <p className="text-md font-black text-[var(--gray-800)]">
                            {article?.Author?.FullName}
                        </p>
                        <p className="text-xs text-[var(--gray-700)]">
                            {article?.UpdatedAt &&
                                new Date(article.UpdatedAt).toDateString()}
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

                {isArticleOwner && (
                    <Button
                        select="warning"
                        type="button"
                        title="Edit Article"
                        className="absolute top-4 left-4 !rounded-full !text-[var(--gray-800)] !p-4"
                        onClick={() =>
                            navigate(`/app/article/edit/${articleId}`)
                        }
                    >
                        <FiEdit size={18} />
                    </Button>
                )}
            </ArticleCoverImageContainer>

            <ArticleBodyContainer data-color-mode="light">
                <h1 className="text-5xl font-bold text-[var(--gray-800)] text-center tracking-tight font-serif">
                    {article?.Title}
                </h1>

                {/* Article Tags */}
                <div className="flex gap-2 items-center justify-center">
                    {article?.ArticleTags.map((tag) => {
                        return <Tag text={tag} size="sm" />;
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
                {article?.Sections.map((section, index) => {
                    if (section.ContentType === ArticleSectionType.Image) {
                        return (
                            <ArticleImageSection
                                key={index}
                                src={section.Value}
                                alt="article section"
                            />
                        );
                    } else if (
                        section.ContentType === ArticleSectionType.Markdown
                    ) {
                        return <MDEditor.Markdown source={section.Value} />;
                    }
                })}

                <hr />

                <AuthorMoreInfoContainer>
                    <div className="flex justify-between items-center w-full">
                        <AuthorProfileImage
                            src={
                                article?.Author?.ProfileImage ??
                                defaultUserImage
                            }
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
                        Written by {article?.Author?.FullName}
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
