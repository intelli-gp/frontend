import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import { ImageUploadSection } from '../../components/article-image-section/article-image-section.component';
import MarkdownEditor from '../../components/markdown-editor/markdown.component';
import { Modal } from '../../components/modal/modal.component';
import OpenImage from '../../components/openImage/openImage.component';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import { useUploadImage } from '../../hooks/uploadImage.hook';
import { PageTitle } from '../../index.styles';
import {
    RootState,
    addArticleSection,
    changeArticleCoverImage,
    changeArticleSectionValue,
    changeArticleTags,
    changeArticleTitle,
    executeSectionDeletion,
    openDeleteSectionModal,
    setSectionToBeDeleted,
    useCreateArticleMutation,
    useGetAllTagsQuery,
} from '../../store';
import {
    ArticleSection,
    ArticleSectionToSend,
    ArticleSectionType,
    ArticleToSend,
} from '../../types/article.d';
import { Response } from '../../types/response';
import { errorToast, successToast } from '../../utils/toasts';
import { wait } from '../../utils/wait';
import {
    AddSectionItem,
    AddSectionMenu,
    ArticleCoverImageContainer,
    ArticleTitleInput,
    PageContainer,
    SectionContainer,
} from './create-article.styles';

const CreateArticlePage = () => {
    const [addSectionMenuIsOpen, setAddSectionMenuIsOpen] = useState(false);

    const navigate = useNavigate();

    const addSectionButtonRef = useRef<HTMLDivElement>(null);

    const { data: availableTagsRes } = useGetAllTagsQuery();

    const [
        createArticle,
        {
            isSuccess: isArticleCreatedSuccessfully,
            isError: isArticleCreateError,
            isLoading: isArticleCreating,
            error: articleCreateError,
            data: createdArticle,
        },
    ] = useCreateArticleMutation();

    const {
        isLoading: imageUploadIsLoading,
        trigger: imageUploadTrigger,
        reset: imageUploadReset,
    } = useUploadImage();

    const { tags, sections, title, cover, deleteSectionModalIsOpen } =
        useSelector((state: RootState) => state['article-creator']);

    const dispatch = useDispatch();

    const handleSectionEdit = (targetSectionId: number, newValue: string) => {
        dispatch(changeArticleSectionValue({ targetSectionId, newValue }));
    };

    const addMarkdownSection = () => {
        dispatch(addArticleSection(ArticleSectionType.Markdown));
    };

    const addImageSection = () => {
        dispatch(addArticleSection(ArticleSectionType.Image));
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

    const publishBlogPost = async () => {
        if (!validateArticle()) return;

        const article: Partial<ArticleToSend> = {
            tags,
            title,
        };

        if (cover) {
            try {
                article.coverImageUrl = await imageUploadTrigger(cover);
            } catch (err) {
                errorToast(
                    'Error uploading cover image while publishing blog post!',
                );
                return;
            } finally {
                imageUploadReset();
            }
        }

        let sectionsToSend: ArticleSectionToSend[] = [];

        for (const section of sections) {
            if (section.contentType === ArticleSectionType.Image) {
                try {
                    let remoteURL = await imageUploadTrigger(section.value);
                    sectionsToSend.push([remoteURL, section.contentType]);
                } catch (err) {
                    errorToast(
                        'Error uploading image while publishing blog post!',
                    );
                    return;
                } finally {
                    imageUploadReset();
                }
            } else if (section.contentType === ArticleSectionType.Markdown) {
                sectionsToSend.push([section.value, section.contentType]);
            }
        }

        article.sections = sectionsToSend;
        await createArticle(article as ArticleToSend).unwrap();
    };

    useEffect(() => {
        function hideAddSectionMenu() {
            setAddSectionMenuIsOpen(false);
        }

        document.addEventListener('click', hideAddSectionMenu);

        return () => {
            document.removeEventListener('click', hideAddSectionMenu);
        };
    }, []);

    useEffect(() => {
        if (isArticleCreateError) {
            errorToast('Error creating article!', articleCreateError as string);
        }
        if (isArticleCreatedSuccessfully) {
            successToast('Article created successfully!');
            wait(1000).then(() => {
                navigate(
                    `/app/articles/${
                        (createdArticle as unknown as Response).data.ID
                    }`,
                );
            });
        }
    }, [isArticleCreatedSuccessfully, isArticleCreateError]);

    const DeleteSectionModal = (
        <Modal
            isOpen={deleteSectionModalIsOpen}
            setIsOpen={(show: boolean) => {
                dispatch(openDeleteSectionModal(show));
            }}
        >
            <div className="flex flex-col gap-8">
                <p className="text-2xl font-bold text-[var(--gray-800)] text-center">
                    Are you sure you want to delete this section?
                </p>
                <div className="flex gap-4 justify-center">
                    <Button
                        type="button"
                        className="!px-8"
                        onClick={() => dispatch(openDeleteSectionModal(false))}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="!px-8"
                        type="button"
                        select="danger"
                        onClick={() => dispatch(executeSectionDeletion())}
                    >
                        Yes
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
        <PageContainer>
            {DeleteSectionModal}

            <PageTitle>Create New Article</PageTitle>

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
                placeholder="Type article title..."
                value={title}
                onChange={(e) => {
                    dispatch(changeArticleTitle(e.target.value));
                }}
            />

            {TagsInputSection}

            {sections.map((section: ArticleSection) => {
                if (section.contentType === ArticleSectionType.Markdown) {
                    return (
                        <SectionContainer>
                            <MarkdownEditor
                                key={section.id!}
                                value={section.value}
                                onChange={(value: string | undefined) =>
                                    handleSectionEdit(section.id!, value!)
                                }
                                onDelete={() => {
                                    dispatch(
                                        setSectionToBeDeleted(section.id!),
                                    );
                                }}
                            />
                        </SectionContainer>
                    );
                } else if (section.contentType === ArticleSectionType.Image) {
                    return <ImageUploadSection section={section} />;
                }
            })}

            <div className="flex flex-col items-center gap-4 fixed bottom-4 right-4 z-40">
                {addSectionMenuIsOpen && (
                    <AddSectionMenu>
                        <AddSectionItem onClick={addMarkdownSection}>
                            Markdown
                        </AddSectionItem>
                        <AddSectionItem onClick={addImageSection}>
                            Image
                        </AddSectionItem>
                    </AddSectionMenu>
                )}

                <Button
                    type="button"
                    className="!p-4 !rounded-full justify-center"
                    onClick={(e: unknown) => {
                        (e as MouseEvent).stopPropagation();
                        setAddSectionMenuIsOpen(true);
                    }}
                    title="Add New section"
                    ref={addSectionButtonRef}
                >
                    <FaPlus size={24} />
                </Button>
                <Button
                    select="success"
                    type="button"
                    className="!p-4 !rounded-full items-center justify-center"
                    onClick={publishBlogPost}
                    loading={imageUploadIsLoading || isArticleCreating}
                    title="Publish article"
                >
                    <IoSend size={24} />
                </Button>
            </div>
        </PageContainer>
    );
};

export default CreateArticlePage;
