import { motion } from 'framer-motion';
import moment from 'moment';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import { AuthorCard } from '../../components/article-author-card/author-card.component';
import ArticleComment, {
    ArticleWriteComment,
} from '../../components/article-comment/article-comment.component';
import Button from '../../components/button/button.component';
import DropdownMenu from '../../components/menu/menu.component';
import { Modal } from '../../components/modal/modal.component';
import {
    ModalExitButton,
    ModalHeader,
} from '../../components/modal/model.styles';
import { SwiperSlider } from '../../components/swiper/swiper-slider.component';
import Tag from '../../components/tag/tag.component';
import UserItem from '../../components/user-Item/user-item.component';
import VerticalArticle from '../../components/vertical-article/vertical-article.component';
import { BetweenPageAnimation, ModalTitle } from '../../index.styles';
import {
    useDeleteArticleMutation,
    useGetArticleQuery,
    useGetBookmarkedArticlesQuery,
    useToggleBookmarkArticleMutation,
    useToggleLoveArticleMutation,
} from '../../store';
import { RootState } from '../../store';
import { useFetchSpecificArticlesRecommendationQuery } from '../../store/apis/recommendationApi';
import { ArticleSectionType, ReceivedArticle } from '../../types/article.d';
import { ReceivedUser } from '../../types/user';
import { errorToast, successToast } from '../../utils/toasts';
import {
    CommentsContainer,
    EmptyPlaceholder,
    IconWithCounter,
    InteractionCounter,
    SuggestedArticlesTitle,
    UserItemsContainer,
} from './view-article.styles';
import {
    ArticleBodyContainer,
    ArticleCoverImage,
    ArticleCoverImageContainer,
    ArticleHeader,
    ArticleImageSection,
    ArticleTitle,
    ArticleToolbar,
    BookmarkIcon,
    CommentsIcon,
    LoveIcon,
    OptionsIcon,
    PageContainer,
    PublishDate,
    SuggestedArticlesContainer,
    ToolbarIconsContainer,
    VerticalLine,
} from './view-article.styles';

const ArticleMDSection = lazy(() => import('./md-viewer.styles'));

const ViewArticlePage = () => {
    const navigate = useNavigate();
    const { articleId } = useParams();

    const commentsPanelRef = useRef<HTMLDivElement>(null);
    const commentIconRef = useRef<HTMLDivElement>(null);

    const [commentsPanelIsOpen, setCommentsPanelIsOpen] = useState(false);
    const [deleteArticleModalIsOpen, setDeleteArticleModalIsOpen] =
        useState(false);
    const [lovedByModalIsOpen, setLovedByModalIsOpen] = useState(false);
    const [isArticleLoved, setIsArticleLoved] = useState(false);
    const [isArticleBookmarked, setIsArticleBookmarked] = useState(false);

    const storedUser = useSelector((state: RootState) => state.auth.user);

    const [removeArticle] = useDeleteArticleMutation();
    const [toggleLoveArticle] = useToggleLoveArticleMutation();
    const [toggleBookmarkArticle] = useToggleBookmarkArticleMutation();
    const {
        data: bookmarkedArticles,
        isLoading: bookmarkedArticlesIsLoading,
        isFetching: bookmarkedArticlesIsFetching,
    } = useGetBookmarkedArticlesQuery({ limit: 1e3, offset: 0 });
    const {
        data,
        isLoading: articleIsLoading,
        isFetching: articleIsFetching,
        isSuccess: articleLoadedSuccessfully,
    } = useGetArticleQuery(parseInt(articleId!));
    const article = data?.data;
    const isArticleOwner =
        article?.Author?.Username === (storedUser as ReceivedUser)?.Username;

    const { data: _articleRecommendations } =
        useFetchSpecificArticlesRecommendationQuery({
            searchTerm: articleId + '',
            limit: 5,
            offset: 0,
        });
    const recommendedArticles =
        (_articleRecommendations?.data?.Results as ReceivedArticle[]) ?? [];

    const articleOptions = [
        {
            option: 'Copy Link',
            handler: () => {
                navigator.clipboard.writeText(window.location.href);
                successToast('Link copied to clipboard!');
            },
        },
    ];

    if (isArticleOwner) {
        articleOptions.push({
            option: 'Edit',
            handler: () => navigate(`/app/article/edit/${articleId}`),
        });
        articleOptions.push({
            option: 'Delete',
            handler: () => setDeleteArticleModalIsOpen(true),
        });
    }

    const openCommentsPanel = () => {
        commentsPanelRef.current?.classList.add('open');
        setCommentsPanelIsOpen(true);
    };

    const closeCommentsPanel = () => {
        commentsPanelRef.current?.classList.remove('open');
        setCommentsPanelIsOpen(false);
    };

    const handleDeleteArticle = async () => {
        try {
            await removeArticle(parseInt(articleId!)).unwrap();
            successToast('Article deleted successfully!');
            navigate('/app/articles');
        } catch (error) {
            errorToast('Error occurred while deleting the article.');
        }
    };

    const handleToggleLoveArticle = async () => {
        try {
            if (!isArticleLoved) {
                setIsArticleLoved(true);
            }
            await toggleLoveArticle(parseInt(articleId!)).unwrap();
        } catch (error) {
            errorToast('Error occurred while toggling like');
        }
    };

    const handleBookmarkArticle = async () => {
        try {
            let alreadyBookmarked = isArticleBookmarked;
            if (!alreadyBookmarked) {
                // Set it here and in useEffect to avoid waiting for the response.
                setIsArticleBookmarked(true);
            }
            await toggleBookmarkArticle(parseInt(articleId!)).unwrap();
            if (alreadyBookmarked) {
                successToast('Article removed from bookmarks');
            } else {
                successToast('Article added to bookmarks');
            }
        } catch (error) {
            errorToast('Error occurred while toggling bookmark');
        }
    };

    const DeleteArticleModal = (
        <Modal
            isOpen={deleteArticleModalIsOpen}
            setIsOpen={setDeleteArticleModalIsOpen}
            title="Are you sure you want to delete this Article?"
            width="lg"
        >
            <div className="flex gap-4 flex-row-reverse">
                <Button
                    className="!px-8"
                    select="danger"
                    outline
                    onClick={handleDeleteArticle}
                >
                    Yes
                </Button>
                <Button
                    className="!px-6"
                    onClick={() => setDeleteArticleModalIsOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );

    const LovedByModal = (
        <Modal
            title="This article is liked by"
            isOpen={lovedByModalIsOpen}
            setIsOpen={setLovedByModalIsOpen}
        >
            {article?.LikedBy?.length === 0 && (
                <EmptyPlaceholder>Nobody, yet.</EmptyPlaceholder>
            )}

            {(article?.LikedBy?.length ?? 0) > 0 && (
                <UserItemsContainer>
                    {article?.LikedBy?.map((user) => (
                        <UserItem
                            FullName={user.FullName}
                            Username={user.Username}
                            ProfileImage={user.ProfileImage}
                            emoji="❤️"
                        />
                    ))}
                </UserItemsContainer>
            )}
        </Modal>
    );

    // Set the title of the page to the article title
    useEffect(() => {
        if (articleLoadedSuccessfully) {
            document.title = `Mujedd | ${article?.Title}`;
        }
        return () => {
            document.title = 'Mujedd';
        };
    }, [articleLoadedSuccessfully]);

    useEffect(() => {
        if (articleIsLoading || articleIsFetching) return;
        setIsArticleLoved(
            article?.LikedBy?.some((user) => user.ID === storedUser?.ID) ??
                false,
        );
    }, [
        articleIsLoading,
        articleIsFetching,
        bookmarkedArticlesIsLoading,
        article,
    ]);

    useEffect(() => {
        if (bookmarkedArticlesIsLoading || bookmarkedArticlesIsFetching) return;
        setIsArticleBookmarked(
            bookmarkedArticles?.data?.Results?.some(
                (bookmarkedArticle) => bookmarkedArticle.ID === article?.ID,
            ) ?? false,
        );
    }, [bookmarkedArticlesIsLoading, bookmarkedArticlesIsFetching, article]);

    useEffect(() => {
        const clickScreenHandler = (e: MouseEvent) => {
            if (
                !commentIconRef.current?.contains(e.target as Node) &&
                !commentsPanelRef.current?.contains(e.target as Node)
            ) {
                closeCommentsPanel();
            }
        };
        document.addEventListener('click', clickScreenHandler);
        return () => {
            document.removeEventListener('click', clickScreenHandler);
        };
    }, []);

    if (articleIsLoading) {
        return <Spinner />;
    }

    return (
        <PageContainer {...BetweenPageAnimation}>
            {DeleteArticleModal}
            {LovedByModal}

            <ArticleCoverImageContainer>
                <ArticleCoverImage
                    src={article?.CoverImage}
                    alt="article cover image"
                />
                <AuthorCard article={article!} />
            </ArticleCoverImageContainer>

            <ArticleBodyContainer data-color-mode="light">
                <ArticleHeader>
                    <ArticleTitle>{article?.Title}</ArticleTitle>

                    <PublishDate>
                        {moment(article?.UpdatedAt).format('DD MMMM, YYYY')}
                    </PublishDate>

                    <div className="flex gap-2 justify-center flex-wrap">
                        {article?.ArticleTags.map((tag) => {
                            return <Tag text={tag} />;
                        })}
                    </div>
                </ArticleHeader>

                <ArticleToolbar className="flex justify-between">
                    <ToolbarIconsContainer>
                        <IconWithCounter>
                            <AnimatedIconWrapper>
                                <LoveIcon
                                    size={28}
                                    title="Like"
                                    active={isArticleLoved}
                                    onClick={handleToggleLoveArticle}
                                />
                            </AnimatedIconWrapper>
                            <InteractionCounter
                                title="View how liked this article"
                                onClick={() => setLovedByModalIsOpen(true)}
                            >
                                {article?.LikedBy?.length ?? 0}
                            </InteractionCounter>
                        </IconWithCounter>
                        <VerticalLine />
                        <AnimatedIconWrapper>
                            <BookmarkIcon
                                size={24}
                                title="Bookmark"
                                active={isArticleBookmarked}
                                onClick={handleBookmarkArticle}
                            />
                        </AnimatedIconWrapper>
                    </ToolbarIconsContainer>
                    <ToolbarIconsContainer>
                        <IconWithCounter ref={commentIconRef}>
                            <AnimatedIconWrapper>
                                <CommentsIcon
                                    size={24}
                                    title="Comments"
                                    active={commentsPanelIsOpen}
                                    onClick={openCommentsPanel}
                                />
                            </AnimatedIconWrapper>
                            <InteractionCounter onClick={openCommentsPanel}>
                                {article?.Comments?.length ?? 0}
                            </InteractionCounter>
                        </IconWithCounter>
                        <VerticalLine />
                        <DropdownMenu
                            right="0"
                            menuWidth="8rem"
                            options={articleOptions}
                        >
                            <OptionsIcon size={24} title="Options" />
                        </DropdownMenu>
                    </ToolbarIconsContainer>
                </ArticleToolbar>

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
                        return (
                            <Suspense fallback={<Spinner />}>
                                <ArticleMDSection source={section.Value} />
                            </Suspense>
                        );
                    }
                })}
            </ArticleBodyContainer>

            <SuggestedArticlesContainer>
                <SuggestedArticlesTitle>
                    More from the same preference:
                </SuggestedArticlesTitle>
                <SwiperSlider>
                    {recommendedArticles?.map((article) => (
                        <VerticalArticle
                            {...article}
                            enableAuthorLink
                            continueReadingLink={`/app/articles/${article.ID}`}
                        />
                    ))}
                </SwiperSlider>
                {recommendedArticles?.length === 0 && (
                    <h2 className='mx-auto my-6 text-xl'>No suggestions found</h2>
                )}
            </SuggestedArticlesContainer>

            <CommentsContainer ref={commentsPanelRef}>
                <ModalHeader>
                    <ModalTitle>Comments</ModalTitle>
                    <ModalExitButton onClick={closeCommentsPanel}>
                        <IoCloseOutline size={28} />
                    </ModalExitButton>
                </ModalHeader>
                <div className="flex-1 overflow-auto p-2">
                    {article?.Comments?.map((comment) => (
                        <ArticleComment comment={comment} />
                    ))}
                </div>
                <ArticleWriteComment articleId={parseInt(articleId!)} />
            </CommentsContainer>
        </PageContainer>
    );
};

// Helper component
type animatedIconWrapperProps = {
    children: React.ReactNode;
};

const AnimatedIconWrapper = ({ children }: animatedIconWrapperProps) => {
    return <motion.span whileTap={{ scale: 1.25 }}>{children}</motion.span>;
};

export default ViewArticlePage;
