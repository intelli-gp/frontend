import MDEditor from '@uiw/react-md-editor';
import moment from 'moment';
import { CiBookmark, CiStar } from 'react-icons/ci';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { IoShareSocial } from 'react-icons/io5';
import { SlOptions } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Spinner from '../../components/Spinner';
import Button from '../../components/button/button.component';
import Tag from '../../components/tag/tag.component';
import { BetweenPageAnimation } from '../../index.styles';
import { useGetArticleQuery } from '../../store';
import { RootState } from '../../store';
import { ArticleSectionType, ReceivedArticle } from '../../types/article.d';
import { Response } from '../../types/response';
import { ReceivedUser } from '../../types/user';
import { profileURL } from '../../utils/profileUrlBuilder';
import {
    ArticleBodyContainer,
    ArticleCoverImage,
    ArticleCoverImageContainer,
    ArticleImageSection,
    ArticleTitle,
    ArticleToolbar,
    AuthorDataContainer,
    AuthorMoreInfoContainer,
    AuthorName,
    AuthorProfileImage,
    PageContainer,
    PublishDate,
    SuggestedArticlesContainer,
} from './view-article.styles';

const ViewArticlePage = () => {
    const navigate = useNavigate();

    const { articleId } = useParams();
    const user = useSelector((state: RootState) => state.auth.user);

    if (!articleId) {
        return <div>Article not found</div>;
    }

    const { data, isLoading } = useGetArticleQuery(parseInt(articleId));
    const article: ReceivedArticle = (data as unknown as Response)?.data;
    const isArticleOwner =
        article?.Author?.Username === (user as ReceivedUser)?.Username;

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <PageContainer {...BetweenPageAnimation}>
            <ArticleCoverImageContainer>
                <ArticleCoverImage
                    src={article?.CoverImage ?? defaultCoverImage}
                    alt="article cover image"
                />

                <AuthorDataContainer
                    to={profileURL(article?.Author?.Username)}
                    title={`View ${article?.Author?.FullName}'s profile`}
                >
                    <AuthorProfileImage
                        src={article?.Author?.ProfileImage ?? defaultUserImage}
                        alt="author profile image"
                    />
                    <div className="flex flex-col gap-0">
                        <AuthorName>
                            {article?.Author?.FullName}
                        </AuthorName>
                        <PublishDate>
                            {article?.UpdatedAt &&
                                moment(new Date(article.UpdatedAt)).fromNow()}
                        </PublishDate>
                    </div>

                    <Button
                        type="button"
                        className="text-xs !p-2 ml-auto"
                        select="primary700"
                    >
                        <FiPlus size={18} className="mr-1" />
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
                <ArticleTitle>
                    {article?.Title}
                </ArticleTitle>

                {/* Article Tags */}
                <div className="flex gap-2 items-center justify-center">
                    {article?.ArticleTags.map((tag) => {
                        return <Tag text={tag} />;
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
                            alt=""
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
