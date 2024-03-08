import { ChangeEvent, useRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

import defaultImage from '../../assets/imgs/transparent-camera.png';
import Button from '../Button';
import { Image, OpenImageContainer } from './openImage.style';

type OpenImageProps = {
    value: string;
    onChange: (value: string) => void;
    onDelete?: () => void;
    editButton?: boolean;
    deleteButton?: boolean;
    width?: string;
    height?: string;
    radius?: string;
    cover?: string;
};

export const OpenImage = ({
    value,
    onChange,
    onDelete,
    editButton,
    deleteButton,
    width,
    height,
    radius,
    cover
}: OpenImageProps) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const openFileInput = () => {
        fileInput.current?.click();
    };

    const handleImageSelection = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = () => {
            onChange(reader.result as string);
        };
        reader.readAsDataURL(e.target.files![0]);
    };

    const Buttons = (
        <>
            {editButton && (
                <Button
                    type="button"
                    select="warning"
                    className="!p-2 rounded-none !text-[var(--gray-800)]"
                    title="Click to choose an image"
                    onClick={openFileInput}
                >
                    <FiEdit size={14} />
                </Button>
            )}
            {deleteButton && (
                <Button
                    type="button"
                    select="danger"
                    title="Delete this section"
                    className="z-30 !p-2 rounded-none"
                    onClick={onDelete}
                >
                    <RiDeleteBinLine size={14} />
                </Button>
            )}
        </>
    );

    return (
        <OpenImageContainer>
            <div className="absolute top-0 right-0 z-30">{Buttons}</div>
            <input
                type="file"
                ref={fileInput}
                onChange={handleImageSelection}
                hidden
            />
            <Image
                height={height}
                width={width}
                radius={radius}
                cover={cover}
                src={value || defaultImage}
                title="Click to change the image"
                onClick={openFileInput}
            />
        </OpenImageContainer>
    );
};

export default OpenImage;
