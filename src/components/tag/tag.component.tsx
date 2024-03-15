import React from 'react';

import { DeleteTagButton, TagContainer, TagText } from './tag.styles';

type TagProps = {
    text: string;
    deletable?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    deleteHandler?: React.MouseEventHandler;
    clickHandler?: React.MouseEventHandler;
};

const Tag = ({
    text,
    deletable,
    size,
    deleteHandler,
    clickHandler,
}: TagProps) => {
    return (
        <TagContainer
            size={size}
            deletable={deletable}
            onClick={clickHandler}
            title={text}
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
