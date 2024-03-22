import React from 'react';

import { DeleteTagButton, TagContainer, TagText } from './tag.styles';

type TagProps = {
    text: string;
    deletable?: boolean;
    /**
     * @default
     * 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg';
    /**
     * The color of the tag
     * @default
     * 'normal'
     */
    variant?: 'normal' | 'darker';
    deleteHandler?: React.MouseEventHandler;
    clickHandler?: React.MouseEventHandler;
};

const Tag = ({
    text,
    deletable,
    size,
    variant = 'normal',
    deleteHandler,
    clickHandler,
}: TagProps) => {
    return (
        <TagContainer
            size={size}
            deletable={deletable}
            onClick={clickHandler}
            title={text}
            variant={variant}
        >
            <TagText>{text}</TagText>
            {deletable && (
                <DeleteTagButton onClick={deleteHandler} title="Delete">
                    ✕
                </DeleteTagButton>
            )}
        </TagContainer>
    );
};

export default Tag;
