import { ChangeEvent, useRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

import Button from '../button/button.component';
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
    cover,
}: OpenImageProps) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const openFileInput = (e: React.MouseEvent) => {
        e.stopPropagation();
        fileInput.current?.click();
    };

    const deleteHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete!();
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
                    select="warning"
                    className={`!p-2 !rounded-none`}
                    title="Click to choose an image"
                    onClick={openFileInput}
                >
                    <FiEdit size={14} />
                </Button>
            )}
            {deleteButton && (
                <Button
                    select="danger"
                    title="Delete this section"
                    className="z-30 !p-2 !rounded-none"
                    onClick={deleteHandler}
                >
                    <RiDeleteBinLine size={14} />
                </Button>
            )}
        </>
    );

    return (
        <OpenImageContainer
            title="Click to change the image"
            onClick={openFileInput}
        >
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
                src={value}
            />
        </OpenImageContainer>
    );
};

export default OpenImage;
