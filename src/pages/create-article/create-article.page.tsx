import { ChangeEvent, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import defaultCover from '../../assets/imgs/blogDefaultCover.png';
import Button from '../../components/Button';
import { ImageUploadSection } from '../../components/article-image-section/article-image-section.component';
import MarkdownEditor from '../../components/markdown-editor/markdown.component';
import { Modal } from '../../components/modal/modal.component';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
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
    useGetAllTagsQuery,
} from '../../store';
import { BlogSection } from '../../types/blog';
import {
    ArticleCoverImage,
    ArticleCoverImageContainer,
    ArticleTitleInput,
    EditButton,
    PageContainer,
    SectionContainer,
} from './create-article.styles';

const CreateArticlePage = () => {
    const coverImageRef = useRef<HTMLInputElement>(null);
    const { data: availableTagsRes } = useGetAllTagsQuery();
    const { tags, sections, title, cover, deleteSectionModalIsOpen } =
        useSelector((state: RootState) => state['article-creator']);
    const dispatch = useDispatch();

    const handleSectionEdit = (targetSectionId: number, newValue: string) => {
        dispatch(changeArticleSectionValue({ targetSectionId, newValue }));
    };

    const handleChangeCoverImage = (e: ChangeEvent<HTMLInputElement>) => {
        const newImageSrc = URL.createObjectURL(e.target.files![0]);
        dispatch(changeArticleCoverImage(newImageSrc));
    };

    const openCoverImageFileInput = () => {
        coverImageRef.current?.click();
    };

    const addMarkdownSection = () => {
        dispatch(addArticleSection('markdown'));
    };

    const addImageSection = () => {
        dispatch(addArticleSection('image'));
    };

    const DeleteSectionModal = (
        <Modal
            isOpen={deleteSectionModalIsOpen}
            setIsOpen={(show: boolean) => {
                dispatch(openDeleteSectionModal(show));
            }}
        >
            <div className="flex flex-col gap-8">
                <p className="text-2xl font-bold text-[var(--gray-700)] text-center">
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
            <label
                htmlFor="tags-input-2"
                className="font-bold text-lg text-[var(--gray-700)]"
            >
                What this article about?
            </label>
            <TagsInput2
                updateSelectedTags={(tags: string[]) => {
                    dispatch(changeArticleTags(tags));
                }}
                availableTags={availableTagsRes?.data ?? []}
                selectedTags={tags ?? []}
                wrapperClassName='!border-[var(--gray-400)]'
            />
        </div>
    );

    return (
        <PageContainer>
            {DeleteSectionModal}

            <h1 className="text-4xl font-bold text-[var(--gray-700)]">
                Create New Article
            </h1>

            <ArticleCoverImageContainer>
                <ArticleCoverImage
                    src={cover || defaultCover}
                    onClick={openCoverImageFileInput}
                    title="Click to change the image"
                />
                <input
                    type="file"
                    hidden
                    ref={coverImageRef}
                    onChange={handleChangeCoverImage}
                />
                <EditButton
                    select="warning"
                    type="button"
                    title="Click to change the image"
                    onClick={openCoverImageFileInput}
                >
                    <FiEdit size={14} />
                </EditButton>
            </ArticleCoverImageContainer>

            <ArticleTitleInput
                placeholder="Type article title..."
                value={title}
                onChange={(e) => {
                    dispatch(changeArticleTitle(e.target.value));
                }}
            />

            {TagsInputSection}

            {sections.map((section: BlogSection) => {
                if (section.type === 'markdown') {
                    return (
                        <SectionContainer>
                            <MarkdownEditor
                                key={section.id}
                                value={section.value}
                                onChange={(value: string | undefined) =>
                                    handleSectionEdit(section.id, value!)
                                }
                                onDelete={() => {
                                    dispatch(setSectionToBeDeleted(section.id));
                                }}
                            />
                        </SectionContainer>
                    );
                } else if (section.type === 'image') {
                    return <ImageUploadSection section={section} />;
                }
            })}

            {/* Refactor this */}
            <div className="flex gap-4">
                <Button
                    type="button"
                    className="flex gap-2 !rounded-full items-center justify-center"
                    onClick={addMarkdownSection}
                >
                    <FaPlus size={14} />
                    Markdown
                </Button>
                <Button
                    type="button"
                    className="flex gap-2 !rounded-full items-center justify-center"
                    onClick={addImageSection}
                >
                    <FaPlus size={14} />
                    Image
                </Button>
            </div>
        </PageContainer>
    );
};

export default CreateArticlePage;
