import MDEditor from '@uiw/react-md-editor';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import Spinner from '../../components/Spinner';
import { AuthorCard } from '../../components/article-author-card/author-card.component';
import Button from '../../components/button/button.component';
import DropdownMenu from '../../components/menu/menu.component';
import { Modal } from '../../components/modal/modal.component';
import Tag from '../../components/tag/tag.component';
import { BetweenPageAnimation } from '../../index.styles';
import { useDeleteArticleMutation, useGetArticleQuery } from '../../store';
import { RootState } from '../../store';
import { ArticleSectionType, ReceivedArticle } from '../../types/article.d';
import { Response } from '../../types/response';
import { ReceivedUser } from '../../types/user';
import { errorToast, successToast } from '../../utils/toasts';
import {
    ArticleBodyContainer,
    ArticleCoverImage,
    ArticleCoverImageContainer,
    ArticleHeader,
    ArticleImageSection,
    ArticleTitle,
    ArticleToolbar,
    Bookmark,
    Options,
    PageContainer,
    PublishDate,
    Star,
    SuggestedArticlesContainer,
} from './view-article.styles';

const ViewArticlePage = () => {
    const navigate = useNavigate();
    const { articleId } = useParams();

    const [deleteArticleModalIsOpen, setDeleteArticleModalIsOpen] =
        useState(false);

    const user = useSelector((state: RootState) => state.auth.user);

    const [removeArticle] = useDeleteArticleMutation();
    const { data, isLoading } = useGetArticleQuery(+articleId!);
    const article: ReceivedArticle = (data as unknown as Response)?.data;
    const isArticleOwner =
        article?.Author?.Username === (user as ReceivedUser)?.Username;

    const articleOptions = [{ option: 'Copy Link', handler: () => {
        navigator.clipboard.writeText(window.location.href);
        successToast('Link copied to clipboard!');
    } }];
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

    const deleteArticle = async () => {
        try {
            await removeArticle(+articleId!).unwrap();
            successToast('Article deleted successfully!');
            navigate('/app/articles');
        } catch (error) {
            errorToast('Error occurred while deleting the article.');
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
                    onClick={deleteArticle}
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
                        {moment(article?.UpdatedAt).format('D MMM, YYYY')}
                    </PublishDate>

                    {/* Article Tags */}
                    <div className="flex gap-2 justify-center">
                        {article?.ArticleTags.map((tag) => {
                            return <Tag text={tag} />;
                        })}
                    </div>
                </ArticleHeader>

                <ArticleToolbar className="flex justify-between">
                    <div className="flex gap-4">
                        <Star size={24} title='Start'/>
                        <Bookmark size={24} title='Bookmark '/>
                    </div>
                    <div className="flex gap-4">
                        <DropdownMenu
                            right="0"
                            menuWidth="8rem"
                            options={articleOptions}
                        >
                            <Options size={24} title="Options"/>
                        </DropdownMenu>
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
