import _ from 'lodash';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { LuSave } from 'react-icons/lu';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ImageUploadSection } from '../../components/article-image-section/article-image-section.component';
import Button from '../../components/button/button.component';
import MarkdownEditor from '../../components/markdown-editor/markdown.component';
import DropdownMenu from '../../components/menu/menu.component';
import { Modal } from '../../components/modal/modal.component';
import OpenImage from '../../components/openImage/openImage.component';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import { useUploadImage } from '../../hooks/uploadImage.hook';
import {
    BetweenPageAnimation,
    ModalTitle,
    PageTitle,
} from '../../index.styles';
import {
    RootState,
    addArticleSection,
    changeArticleCoverImage,
    changeArticleSectionValue,
    changeArticleTags,
    changeArticleTitle,
    deleteAllSections,
    executeSectionDeletion,
    openDeleteSectionModal,
    resetArticleCreator,
    setSectionToBeDeleted,
    useCreateArticleMutation,
    useDeleteArticleMutation,
    useGetAllTagsQuery,
    useLazyGetArticleQuery,
    useUpdateArticleMutation,
} from '../../store';
import {
    ArticleSection,
    ArticleSectionToSend,
    ArticleSectionType,
    ArticleToSend,
    ReceivedArticle,
} from '../../types/article.d';
import { Response } from '../../types/response';
import { errorToast, successToast } from '../../utils/toasts';
import {
    ArticleCoverImageContainer,
    ArticleTitleInput,
    PageContainer,
    SectionContainer,
} from './create-article.styles';

const CreateArticlePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addSectionButtonRef = useRef<HTMLDivElement>(null);
    const [removeArticle] = useDeleteArticleMutation();
    const [deleteArticleModalIsOpen, setDeleteArticleModalIsOpen] =
        useState(false);
    const { data: availableTagsRes } = useGetAllTagsQuery();
    const [createArticle, { isLoading: isArticleCreating }] =
        useCreateArticleMutation();
    const {
        isLoading: imageUploadIsLoading,
        trigger: imageUploadTrigger,
        reset: imageUploadReset,
    } = useUploadImage();
    const { tags, sections, title, cover, deleteSectionModalIsOpen } =
        useSelector((state: RootState) => state['article-creator']);

    // These only used when editing an article
    const isEdit = new URL(window.location.href).pathname.includes('edit');
    const { articleId } = useParams();
    const [getArticle, { data }] = useLazyGetArticleQuery();
    const articleBeforeEdit = (data as unknown as Response)
        ?.data as ReceivedArticle;
    const [patchArticle] = useUpdateArticleMutation();

    const handleSectionEdit = (targetSectionId: number, newValue: string) => {
        dispatch(changeArticleSectionValue({ targetSectionId, newValue }));
    };

    const addMarkdownSection = () => {
        dispatch(
            addArticleSection({ ContentType: ArticleSectionType.Markdown }),
        );
    };

    const addImageSection = () => {
        dispatch(addArticleSection({ ContentType: ArticleSectionType.Image }));
    };

    const validateArticle = () => {
        if (!title.trim()) {
            errorToast('Please add a title for your article!');
            return false;
        }

        if (
            !tags.length ||
            _.intersection(tags, [
                'we-are-examples',
                `don't-forget-to`,
                'delete-us',
            ]).length
        ) {
            errorToast(
                'Please select at least one tag, and remove the default tags!',
            );
            return false;
        }

        if (!sections.length) {
            errorToast('Please add at least one section!');
            return false;
        }

        return true;
    };

    const publishArticle = async () => {
        if (!validateArticle()) return;

        const article: Partial<ArticleToSend> = {
            tags,
            title,
        };

        try {
            if (!cover) {
                errorToast('Please add a cover image for your article!');
                return;
            }
            article.coverImageUrl = await imageUploadTrigger(cover);
        } catch (err) {
            errorToast('Error uploading cover image while publishing article!');
            return;
        } finally {
            imageUploadReset();
        }

        let sectionsToSend: ArticleSectionToSend[] = [];

        for (const section of sections) {
            if (!section.Value) continue; // skip empty sections
            if (section.ContentType === ArticleSectionType.Image) {
                try {
                    let remoteURL = await imageUploadTrigger(section.Value);
                    sectionsToSend.push([remoteURL, section.ContentType]);
                } catch (err) {
                    errorToast(
                        'Error uploading image while publishing article!',
                    );
                    return;
                } finally {
                    imageUploadReset();
                }
            } else if (section.ContentType === ArticleSectionType.Markdown) {
                sectionsToSend.push([section.Value, section.ContentType]);
            }
        }

        article.sections = sectionsToSend;

        try {
            let response = await createArticle(
                article as ArticleToSend,
            ).unwrap();
            successToast('Article created successfully!');
            navigate(
                `/app/articles/${(response as unknown as Response).data.ID}`,
            );
            dispatch(resetArticleCreator());
        } catch (error) {
            console.log(error);
            errorToast('Error creating article!');
        }
    };

    const updateArticle = async () => {
        if (!validateArticle()) return;

        // Get diff of tags
        let addedTags = _.difference(tags, articleBeforeEdit.ArticleTags);
        let removedTags = _.difference(articleBeforeEdit.ArticleTags, tags);

        // Get diff of Title
        let titleChanged = title !== articleBeforeEdit.Title;

        // Get diff of cover image
        let coverImageChanged = cover !== articleBeforeEdit.CoverImage;

        // Get diff of sections
        let sectionsChanged = !_.isEqual(
            articleBeforeEdit.Sections,
            sections.map((section) => _.omit(section, 'ID')),
        );

        let update: Partial<ArticleToSend> = {};

        if (addedTags.length) {
            update.addedTags = addedTags;
        }

        if (removedTags.length) {
            update.removedTags = removedTags;
        }

        if (titleChanged) {
            update.title = title;
        }

        if (coverImageChanged) {
            try {
                update.coverImageUrl = await imageUploadTrigger(cover);
            } catch (err) {
                errorToast(
                    'Error uploading cover image while updating article!',
                );
                return;
            } finally {
                imageUploadReset();
            }
        }

        if (sectionsChanged) {
            update.sections = sections.map((section) => {
                return [section.Value, section.ContentType];
            });
        }

        if (_.isEmpty(update)) {
            errorToast('No changes detected!');
            navigate(`/app/articles/${articleBeforeEdit.ID}`);
            dispatch(resetArticleCreator());
            return;
        }

        // TODO: Pls remove me
        console.log(update);

        try {
            await patchArticle({
                id: articleBeforeEdit.ID,
                ...update,
            }).unwrap();
            successToast('Article updated successfully!');
            navigate(`/app/articles/${articleBeforeEdit.ID}`);
            dispatch(resetArticleCreator());
        } catch (err) {
            errorToast('Error updating article!');
        }
    };

    const deleteArticle = async () => {
        let articleId = articleBeforeEdit.ID;
        try {
            await removeArticle(articleId).unwrap();
            successToast('Article deleted successfully!');
            navigate('/app/articles');
        } catch (error) {
            errorToast('Error occurred while deleting the article.');
        }
    };

    useLayoutEffect(() => {
        // In case of editing an article, fetch the article data
        if (!isEdit || !articleId) return;
        getArticle(+articleId)
            .unwrap()
            .then((res) => {
                const article = (res as unknown as Response)
                    .data as ReceivedArticle;
                dispatch(deleteAllSections());
                dispatch(changeArticleTitle(article.Title));
                dispatch(changeArticleCoverImage(article.CoverImage));
                dispatch(changeArticleTags(article.ArticleTags));
                article.Sections.forEach((section) => {
                    dispatch(
                        addArticleSection({
                            ContentType: section.ContentType,
                            Value: section.Value,
                        }),
                    );
                });
            });
    }, []);

    /**
     * This useEffect is used to clear the state of page when the user
     * come here to edit an article then leave the page either by editing
     * the article or just changed their mind, the state need to be cleared
     * to not affect the create article flow.
     */
    useEffect(() => {
        /**
         * return a clean up function that runs when this component
         * in unmounted from the screen
         */
        return () => {
            isEdit && dispatch(resetArticleCreator());
        };
    }, []);

    const DeleteSectionModal = (
        <Modal
            isOpen={deleteSectionModalIsOpen}
            setIsOpen={(show: boolean) => {
                dispatch(openDeleteSectionModal(show));
            }}
        >
            <div className="flex flex-col gap-8">
                <ModalTitle>
                    Are you sure you want to delete this section?
                </ModalTitle>
                <div className="flex gap-4 flex-row-reverse">
                    <Button
                        className="!px-8"
                        type="button"
                        select="danger"
                        outline
                        onClick={() => dispatch(executeSectionDeletion())}
                    >
                        Yes
                    </Button>
                    <Button
                        type="button"
                        className="!px-6"
                        onClick={() => dispatch(openDeleteSectionModal(false))}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );

    const DeleteArticleModal = (
        <Modal
            isOpen={deleteArticleModalIsOpen}
            setIsOpen={setDeleteArticleModalIsOpen}
        >
            <div className="flex flex-col gap-8">
                <ModalTitle>
                    Are you sure you want to delete this Article?
                </ModalTitle>
                <div className="flex gap-4 flex-row-reverse">
                    <Button
                        className="!px-8"
                        type="button"
                        select="danger"
                        outline
                        onClick={deleteArticle}
                    >
                        Yes
                    </Button>
                    <Button
                        type="button"
                        className="!px-6"
                        onClick={() => setDeleteArticleModalIsOpen(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );

    const TagsInputSection = (
        <div className="flex flex-col gap-2">
            <TagsInput2
                label="Topics related to this article"
                updateSelectedTags={(tags: string[]) => {
                    dispatch(changeArticleTags(tags));
                }}
                availableTags={availableTagsRes?.data ?? []}
                selectedTags={tags ?? []}
                wrapperClassName="!border-[var(--gray-400)]"
            />
        </div>
    );

    return (
        <PageContainer {...BetweenPageAnimation}>
            {DeleteSectionModal}
            {DeleteArticleModal}

            <PageTitle>
                {isEdit ? 'Edit Article' : 'Create New Article'}
            </PageTitle>

            <ArticleCoverImageContainer>
                <OpenImage
                    value={cover}
                    onChange={(newImage) => {
                        dispatch(changeArticleCoverImage(newImage));
                    }}
                    editButton
                    height="350px"
                />
            </ArticleCoverImageContainer>

            <ArticleTitleInput
                rows={1}
                placeholder="Type article title..."
                value={title}
                onChange={(e) => {
                    dispatch(changeArticleTitle(e.target.value));
                }}
            />

            {TagsInputSection}

            {sections.map((section: ArticleSection) => {
                if (section.ContentType === ArticleSectionType.Markdown) {
                    return (
                        <SectionContainer>
                            <MarkdownEditor
                                key={section.ID!}
                                value={section.Value}
                                onChange={(value: string | undefined) =>
                                    handleSectionEdit(section.ID!, value!)
                                }
                                onDelete={() => {
                                    dispatch(
                                        setSectionToBeDeleted(section.ID!),
                                    );
                                }}
                            />
                        </SectionContainer>
                    );
                } else if (section.ContentType === ArticleSectionType.Image) {
                    return <ImageUploadSection section={section} />;
                }
            })}

            <div className="flex flex-col items-center gap-2 fixed bottom-4 right-4 z-40">
                <DropdownMenu
                    options={[
                        {
                            option: 'Markdown',
                            handler: addMarkdownSection,
                        },
                        {
                            option: 'Image',
                            handler: addImageSection,
                        },
                    ]}
                    bottom="90%"
                    right="90%"
                >
                    <Button
                        type="button"
                        className="!p-4 !rounded-full justify-center"
                        title="Add New section"
                        ref={addSectionButtonRef}
                    >
                        <FaPlus size={18} />
                    </Button>
                </DropdownMenu>

                <Button
                    select="success"
                    type="button"
                    className="!p-4 !rounded-full items-center justify-center"
                    onClick={isEdit ? updateArticle : publishArticle}
                    loading={imageUploadIsLoading || isArticleCreating}
                    title={isEdit ? 'Save changes' : 'Publish article'}
                >
                    {isEdit ? <LuSave size={18} /> : <IoSend size={18} />}
                </Button>
                {isEdit && (
                    <Button
                        select="danger"
                        type="button"
                        className="!p-4 !rounded-full items-center justify-center"
                        onClick={() => setDeleteArticleModalIsOpen(true)}
                        loading={false}
                        title={'Delete this article'}
                    >
                        <RiDeleteBinLine size={18} />
                    </Button>
                )}
            </div>
        </PageContainer>
    );
};

export default CreateArticlePage;
