import { ChangeEvent, useRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import defaultSectionImage from '../../assets/imgs/coverImageCamera.png';
import { SectionContainer } from '../../pages/create-article/create-article.styles';
import { changeArticleSectionValue, setSectionToBeDeleted } from '../../store';
import { BlogSection } from '../../types/blog';
import { ImageSection } from './article-image-section.styles';
import Button from '../Button';

type ImageUploadSectionProps = {
    section: BlogSection;
};

export const ImageUploadSection = ({ section }: ImageUploadSectionProps) => {
    const fileInput = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const { value: imageSrc, id } = section;

    const handleImageSelection = (e: ChangeEvent<HTMLInputElement>) => {
        const newImageSrc = URL.createObjectURL(e.target.files![0]);
        dispatch(
            changeArticleSectionValue({
                targetSectionId: id,
                newValue: newImageSrc,
            }),
        );
    };

    const openFileInput = () => {
        fileInput.current?.click();
    };

    return (
        <SectionContainer>
            <div className="absolute top-0 right-0 z-30 ">
                <Button
                    type="button"
                    select="warning"
                    className="!p-2 rounded-none !text-[var(--gray-800)]"
                    title="Click to choose an image"
                    onClick={openFileInput}
                >
                    <FiEdit size={14} />
                </Button>
                <Button
                    type="button"
                    select="danger"
                    title="Delete this section"
                    className="z-30 !p-2 rounded-none"
                    onClick={() => {
                        dispatch(setSectionToBeDeleted(section.id));
                    }}
                >
                    <RiDeleteBinLine size={14} />
                </Button>
            </div>
            <input
                type="file"
                ref={fileInput}
                onChange={handleImageSelection}
                hidden
            />
            <ImageSection
                src={imageSrc || defaultSectionImage}
                title="Click to change the image"
                onClick={openFileInput}
            />
        </SectionContainer>
    );
};
