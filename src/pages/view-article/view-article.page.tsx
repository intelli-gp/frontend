import MDEditor from '@uiw/react-md-editor';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import loveSound from '../../assets/sounds/article-love-sound.mp3';
import Spinner from '../../components/Spinner';
import { AuthorCard } from '../../components/article-author-card/author-card.component';
import ArticleComment, {
    ArticleWriteComment,
} from '../../components/article-comment/article-comment.component';
import { Separator } from '../../components/article-comment/article-comment.styles';
import Button from '../../components/button/button.component';
import DropdownMenu from '../../components/menu/menu.component';
import { Modal } from '../../components/modal/modal.component';
import {
    ModalExitButton,
    ModalHeader,
} from '../../components/modal/model.styles';
import Tag from '../../components/tag/tag.component';
import { BetweenPageAnimation, ModalTitle } from '../../index.styles';
import {
    useDeleteArticleMutation,
    useGetArticleQuery,
    useToggleLoveArticleMutation,
} from '../../store';
import { RootState } from '../../store';
import { ArticleSectionType, ReceivedArticle } from '../../types/article.d';
import { Response } from '../../types/response';
import { ReceivedUser } from '../../types/user';
import { errorToast, successToast } from '../../utils/toasts';
import { CommentsContainer, IconWithCounter } from './view-article.styles';
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

const ViewArticlePage = () => {
    const navigate = useNavigate();
    const { articleId } = useParams();

    const commentsPanelRef = useRef<HTMLDivElement>(null);
    const commentIconRef = useRef<HTMLDivElement>(null);

    const [commentsPanelIsOpen, setCommentsPanelIsOpen] = useState(false);
    const [deleteArticleModalIsOpen, setDeleteArticleModalIsOpen] =
        useState(false);
    const [isArticleLoved, setIsArticleLoved] = useState(false);
    const [isArticleBookmarked, _setIsArticleBookmarked] = useState(false);

    const storedUser = useSelector((state: RootState) => state.auth.user);

    const [removeArticle] = useDeleteArticleMutation();
    const [toggleLoveArticle] = useToggleLoveArticleMutation();
    const { data, isLoading, isFetching } = useGetArticleQuery(+articleId!);
    const article: ReceivedArticle = (data as unknown as Response)?.data;
    const isArticleOwner =
        article?.Author?.Username === (storedUser as ReceivedUser)?.Username;

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
            await removeArticle(+articleId!).unwrap();
            successToast('Article deleted successfully!');
            navigate('/app/articles');
        } catch (error) {
            errorToast('Error occurred while deleting the article.');
        }
    };

    const handleToggleLoveArticle = async () => {
        try {
            await toggleLoveArticle(+articleId!).unwrap();
            if (!isArticleLoved) {
                new Audio(loveSound).play();
            }
        } catch (error) {
            errorToast('Error occurred while toggling love');
        }
    };

    // const handleBookmarkArticle = () => {};

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

    useEffect(() => {
        if (isLoading || isFetching) return;
        setIsArticleLoved(
            article?.LikedBy?.some((user) => user.ID === storedUser?.ID),
        );
    }, [isLoading, isFetching]);

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

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <PageContainer {...BetweenPageAnimation}>
            {DeleteArticleModal}
            <ArticleCoverImageContainer>
                <ArticleCoverImage
                    src={article?.CoverImage ?? defaultCoverImage}
                    alt="article cover image"
                />
                <AuthorCard article={article} />
            </ArticleCoverImageContainer>

            <ArticleBodyContainer data-color-mode="light">
                <ArticleHeader>
                    <ArticleTitle>{article?.Title}</ArticleTitle>

                    <PublishDate>
                        {moment(article?.UpdatedAt).format('DD MMMM, YYYY')}
                    </PublishDate>

                    <div className="flex gap-2 justify-center">
                        {article?.ArticleTags.map((tag) => {
                            return <Tag text={tag} />;
                        })}
                    </div>
                </ArticleHeader>

                <ArticleToolbar className="flex justify-between">
                    <ToolbarIconsContainer>
                        <IconWithCounter>
                            <motion.span whileTap={{ scale: 1.25 }}>
                                <LoveIcon
                                    size={28}
                                    title="Love"
                                    active={isArticleLoved}
                                    onClick={handleToggleLoveArticle}
                                />
                            </motion.span>
                            {article?.LikedBy?.length ?? 0}
                        </IconWithCounter>
                        <VerticalLine />
                        <motion.span whileTap={{ scale: 1.25 }}>
                            <BookmarkIcon
                                size={24}
                                title="Bookmark"
                                active={isArticleBookmarked}
                            />
                        </motion.span>
                    </ToolbarIconsContainer>
                    <ToolbarIconsContainer>
                        <IconWithCounter ref={commentIconRef}>
                            <motion.span whileTap={{ scale: 1.25 }}>
                                <CommentsIcon
                                    size={24}
                                    title="Comments"
                                    active={commentsPanelIsOpen}
                                    onClick={openCommentsPanel}
                                />
                            </motion.span>
                            {article?.Comments?.length ?? 0}
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
                        return <MDEditor.Markdown source={section.Value} />;
                    }
                })}

                <hr />

                <SuggestedArticlesContainer>
                    <p className="font-bold text-xl">
                        More from the same preference and author
                    </p>
                </SuggestedArticlesContainer>
            </ArticleBodyContainer>

            <CommentsContainer ref={commentsPanelRef}>
                <ModalHeader>
                    <ModalTitle>Comments</ModalTitle>
                    <ModalExitButton onClick={closeCommentsPanel}>
                        <IoCloseOutline size={28} />
                    </ModalExitButton>
                </ModalHeader>
                <div className="flex-1 overflow-auto">
                    {article?.Comments.map((comment) => (
                        <>
                            <ArticleComment comment={comment} />
                            <Separator />
                        </>
                    ))}
                </div>
                <ArticleWriteComment articleId={+articleId!} />
            </CommentsContainer>
        </PageContainer>
    );
};

export default ViewArticlePage;
