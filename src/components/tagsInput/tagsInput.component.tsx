import Fuse from 'fuse.js';
import { kebabCase } from 'lodash';
import { useEffect, useLayoutEffect, useState } from 'react';

import { useGetSuggestedTagsQuery } from '../../store';
import { infoToast, warningToast } from '../../utils/toasts';
import Button from '../Button';
import Input from '../Input';
import Tag from '../tag/tag.component';
import {
    Dropdown,
    SelectedTagsContainer,
    TagListItem,
    TypingSection,
} from './tagsInput.styles';

type TagsInputProps = {
    availableTags: string[];
    selectedTags: string[];
    removeTagFromSelected: (tag: string) => void;
    addTagToSelected: (tag: string) => void;
};

const TagsInput = ({
    availableTags,
    selectedTags,
    removeTagFromSelected,
    addTagToSelected,
}: TagsInputProps) => {
    const [typing, setTyping] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [filteredTags, setFilteredTags] = useState(availableTags);
    let {
        data: suggestedTagsRes,
        isLoading,
        isError,
    } = useGetSuggestedTagsQuery(10);
    const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

    const handleUserTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTyping(e.target.value);
        let searchResult = new Fuse(availableTags).search(typing);
        let filteredTags = searchResult
            .slice(0, 5)
            .map((tag) => tag.item)
            .filter((tag) => !selectedTags.includes(tag));

        if (filteredTags.length > 0) {
            setFilteredTags(filteredTags);
            openDropdown();
        } else {
            setFilteredTags([]);
            closeDropdown();
        }
    };

    const createNewTag = (tag: string) => {
        const newTag = kebabCase(tag);
        if (newTag.trim() === '') {
            warningToast('Please enter a valid tag', 'top-right');
            return;
        }
        if (selectedTags.includes(newTag)) {
            infoToast('This tag is already selected', 'top-right');
            return;
        }
        addTagToSelected(newTag);
        setTyping('');
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const openDropdown = () => {
        setIsOpen(true);
    };

    const clickSuggestedTag = (e: React.MouseEvent) => {
        const tag = (e.target as HTMLElement).innerText;
        if (selectedTags.includes(tag)) {
            infoToast('This tag is already selected', 'top-right');
            return;
        }
        addTagToSelected(tag);
        setSuggestedTags(suggestedTags.filter((t) => t !== tag));
    };

    const ConditionalDropdown = isOpen && (
        <Dropdown>
            {filteredTags.map((tag) => {
                return (
                    <TagListItem
                        key={tag}
                        onClick={() => {
                            addTagToSelected(tag);
                            setTyping('');
                        }}
                    >
                        {tag}
                    </TagListItem>
                );
            })}
        </Dropdown>
    );

    useEffect(() => {
        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    useLayoutEffect(() => {
        if (!isLoading && !isError) {
            setSuggestedTags(suggestedTagsRes?.data || []);
        }
    }, [suggestedTagsRes]);

    return (
        <div className="xl:w-[500px] md:w-[400px] xs:w-[350px] flex flex-col gap-6">
            <TypingSection>
                <Input
                    label="Select at least 3 tags"
                    value={typing}
                    autoComplete="off"
                    onChange={handleUserTyping}
                    placeholder="software, programming, web-development, ..."
                />
                {ConditionalDropdown}
                <Button
                    className="flex gap-2"
                    type="button"
                    onClick={() => createNewTag(typing)}
                >
                    Add new tag
                </Button>
            </TypingSection>

            <section>
                <p className="font-bold mb-2">Suggested tags</p>
                <SelectedTagsContainer>
                    {suggestedTags.map((tag) => (
                        <Tag
                            key={tag}
                            size="small"
                            text={tag}
                            clickHandler={clickSuggestedTag}
                        />
                    ))}
                </SelectedTagsContainer>
            </section>

            <section className="mb-20">
                <p className="font-bold mb-2">Your selected tags</p>
                <SelectedTagsContainer>
                    {selectedTags.map((tag) => (
                        <Tag
                            key={tag}
                            size="small"
                            text={tag}
                            deletable={true}
                            deleteHandler={() => {
                                removeTagFromSelected(tag);
                            }}
                        />
                    ))}
                </SelectedTagsContainer>
            </section>
        </div>
    );
};

export default TagsInput;
