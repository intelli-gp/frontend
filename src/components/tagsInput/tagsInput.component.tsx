import { AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { kebabCase } from 'lodash';
import { useEffect, useLayoutEffect, useState } from 'react';

import { useGetSuggestedTagsQuery } from '../../store';
import { infoToast, warningToast } from '../../utils/toasts';
import { CustomInput } from '../input/Input.component';
import { Label } from '../input/input.styles';
import Tag from '../tag/tag.component';
import {
    SectionWrapper,
    SelectedTags,
    SelectedTagsContainer,
    SuggestionItem,
    SuggestionsList,
    TypingSection,
} from './tagsInput.styles';

type TagsInputProps = {
    /**
     * List of initial available tags
     */
    availableTags: string[];
    /**
     * List of selected tags
     */
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
    const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

    let {
        data: suggestedTagsRes,
        isLoading,
        isError,
    } = useGetSuggestedTagsQuery(10);

    const handleUserTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTyping(e.target.value);
        let searchResult = new Fuse(availableTags).search(typing);
        let filteredTags = searchResult
            .slice(0, 5)
            .map((tag) => tag.item)
            .filter((tag) => !selectedTags.includes(tag));

        if (filteredTags.length > 0) {
            setFilteredTags(filteredTags);
            openSuggestions();
        } else {
            setFilteredTags([]);
            closeSuggestions();
        }
    };

    const handlePressEnter = (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();

        createNewTag(typing);
    };

    const createNewTag = (tag: string) => {
        const newTag = kebabCase(tag);
        if (newTag.trim() === '') {
            warningToast('Please enter a valid tag');
            return;
        }
        if (selectedTags.includes(newTag)) {
            infoToast('This tag is already selected');
            return;
        }
        addTagToSelected(newTag);
        setTyping('');
    };

    const closeSuggestions = () => {
        setIsOpen(false);
    };

    const openSuggestions = () => {
        setIsOpen(true);
    };

    const clickSuggestedTag = (e: React.MouseEvent) => {
        const tag = (e.target as HTMLElement).innerText;
        if (selectedTags.includes(tag)) {
            infoToast('This tag is already selected');
            return;
        }
        addTagToSelected(tag);
        setSuggestedTags(suggestedTags.filter((t) => t !== tag));
    };

    const ConditionalDropdown = isOpen && (
        <SuggestionsList
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '' }}
            exit={{ opacity: 0, height: 0 }}
        >
            {filteredTags.map((tag) => {
                return (
                    <SuggestionItem
                        key={tag}
                        onClick={() => {
                            addTagToSelected(tag);
                            setTyping('');
                        }}
                    >
                        {tag}
                    </SuggestionItem>
                );
            })}
        </SuggestionsList>
    );

    useEffect(() => {
        document.addEventListener('click', closeSuggestions);
        return () => {
            document.removeEventListener('click', closeSuggestions);
        };
    }, []);

    useLayoutEffect(() => {
        if (!isLoading && !isError) {
            setSuggestedTags(suggestedTagsRes?.data || []);
        }
    }, [suggestedTagsRes]);

    return (
        <div className="3xs:w-[20rem] md:!w-[25rem] flex flex-col gap-6">
            <TypingSection>
                <CustomInput
                    label="Select at least 3 tags"
                    value={typing}
                    autoComplete="off"
                    onChange={handleUserTyping}
                    onKeyDown={handlePressEnter}
                    placeholder="Search for tags..."
                />
                <AnimatePresence>{ConditionalDropdown}</AnimatePresence>
            </TypingSection>

            <SectionWrapper>
                <Label>Suggested tags:</Label>
                <SelectedTagsContainer>
                    <SelectedTags>
                        {suggestedTags.map((tag) => (
                            <Tag
                                key={tag}
                                size="sm"
                                text={tag}
                                clickHandler={clickSuggestedTag}
                            />
                        ))}
                    </SelectedTags>
                </SelectedTagsContainer>
            </SectionWrapper>

            <SectionWrapper className="mb-10">
                <Label>Your selected tags:</Label>
                <SelectedTagsContainer>
                    <SelectedTags>
                        {selectedTags.map((tag) => (
                            <Tag
                                key={tag}
                                size="sm"
                                text={tag}
                                deletable={true}
                                deleteHandler={() => {
                                    removeTagFromSelected(tag);
                                }}
                            />
                        ))}
                    </SelectedTags>
                </SelectedTagsContainer>
            </SectionWrapper>
        </div>
    );
};

export default TagsInput;
