import Fuse from 'fuse.js';
import _ from 'lodash';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import Tag from '../tag/tag.component';
import { Dropdown, TagListItem, TagsContainer } from './tagsInput2.styles';

type TagsInput2Props = {
    updateSelectedTags: (tags: string[]) => void;
    availableTags: string[];
    selectedTags: string[];
    disabled?: boolean;
};

const TagsInput2 = ({
    updateSelectedTags,
    availableTags,
    selectedTags,
    disabled,
}: TagsInput2Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [typing, setTyping] = useState('');
    const [filteredTags, setFilteredTags] = useState(availableTags);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.addEventListener('click', closeDropdown);
        inputRef.current?.addEventListener('keydown', handleEnterPressed);
        return () => {
            document.removeEventListener('click', closeDropdown);
            inputRef.current?.removeEventListener(
                'keydown',
                handleEnterPressed,
            );
        };
    });

    const handleEnterPressed = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateSelectedTags([...selectedTags, _.kebabCase(typing)]);
            setTyping('');
        } else {
        }
    };

    const handleUserTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTyping(e.target.value);
        let searchResult = new Fuse(availableTags).search(typing);

        let filteredTags = searchResult
            .slice(0, 5) // Take the first 5 results
            .map((tag) => tag.item)
            .filter((tag) => !selectedTags.includes(tag)); // Remove tags that are already selected

        if (filteredTags.length > 0) {
            setFilteredTags(filteredTags);
            openDropdown();
        } else {
            setFilteredTags([]);
            closeDropdown();
        }
    };

    const openDropdown = () => {
        setIsOpen(true);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <TagsContainer
            onClick={() => {
                inputRef.current?.focus();
            }}
            disabled={disabled}
        >
            {selectedTags?.map((tag) => (
                <Tag
                    key={tag}
                    text={tag}
                    deletable={true}
                    size="sm"
                    deleteHandler={() => {
                        updateSelectedTags(
                            selectedTags.filter((t) => t !== tag),
                        );
                    }}
                />
            ))}
            <input
                type="text"
                ref={inputRef}
                title="Add a new tag"
                autoComplete="off"
                className="flex-1"
                onChange={handleUserTyping}
                value={typing}
            />
            {isOpen && (
                <Dropdown>
                    {filteredTags.map((tag) => {
                        return (
                            <TagListItem
                                key={tag}
                                onClick={() => {
                                    setTyping('');
                                    updateSelectedTags([...selectedTags, tag]);
                                }}
                            >
                                {tag}
                            </TagListItem>
                        );
                    })}
                </Dropdown>
            )}
        </TagsContainer>
    );
};

export default TagsInput2;
