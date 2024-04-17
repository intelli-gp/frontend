import React, { useEffect, useState } from 'react';
import { CgMathPlus } from 'react-icons/cg';

import { useLazyGetAutocompleteSuggestionsQuery } from '../../store/apis/searchApi';
import { SUGGESTION_TYPE } from '../../types/search';
import {
    Container,
    CreateButton,
    SearchBarContainer,
    SearchIcon,
    SuggestionItem,
    SuggestionsContainer,
} from './explore-page-header.style';

type ExplorePageHeaderProps = {
    searchValue: string;
    onSearchValueChange: (value: string) => void;
    onCreateButtonClick?: () => void;
    placeholder?: string;
    WithoutButton?: boolean;
    /**
     * a function to be triggered when search
     * icon is clicked or user press `Enter`
     * after typing on the search bar
     */
    searchHandler?: (searchTerm: string) => void | Promise<void>;
    /**
     * If passed, the search suggestions will be shown
     * when the user types on the search bar.
     */
    suggestionsType?: SUGGESTION_TYPE;
};

const ExplorePageHeader = ({
    searchValue,
    onSearchValueChange,
    onCreateButtonClick,
    placeholder,
    WithoutButton,
    searchHandler,
    suggestionsType,
}: ExplorePageHeaderProps) => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [getAutoCompleteSuggestions, { data: _searchSuggestions }] =
        useLazyGetAutocompleteSuggestionsQuery();
    const searchSuggestions = _searchSuggestions?.data as string[];

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === `Enter`) {
            searchHandler && searchHandler(searchValue);
        }
    };

    const handleSearchValueChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        onSearchValueChange(e.target.value);
        if (!suggestionsType) return;
        await getAutoCompleteSuggestions({
            searchTerm: e.target.value,
            type: suggestionsType,
        });
    };

    const handleClickSuggestion = (suggestion: string) => {
        onSearchValueChange(suggestion);
        searchHandler && searchHandler(suggestion);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const screenClickHandler = () => {
            setShowSuggestions(false);
        };

        document.addEventListener('click', screenClickHandler);

        return () => {
            document.removeEventListener('click', screenClickHandler);
        };
    }, []);

    useEffect(() => {
        if (searchSuggestions?.length) {
            setShowSuggestions(true);
        } else setShowSuggestions(false);
    }, [searchSuggestions]);

    return (
        <Container onKeyDown={handleKeyDown}>
            <SearchBarContainer>
                <SearchIcon
                    title={'Search'}
                    onClick={() => {
                        searchHandler && searchHandler(searchValue);
                    }}
                />
                <input
                    className="border-none outline-none focus-visible:outline-none flex-1"
                    placeholder={placeholder ?? 'Search...'}
                    value={searchValue}
                    onChange={handleSearchValueChange}
                />
                {showSuggestions && (
                    <SuggestionsContainer
                        initial={{
                            height: 0,
                        }}
                        animate={{
                            height: 'auto',
                        }}
                    >
                        {searchSuggestions?.map((suggestion) => (
                            <SuggestionItem
                                onClick={() =>
                                    handleClickSuggestion(suggestion)
                                }
                            >
                                {suggestion}
                            </SuggestionItem>
                        ))}
                    </SuggestionsContainer>
                )}
            </SearchBarContainer>
            {WithoutButton ? (
                <></>
            ) : (
                <CreateButton
                    title="Create"
                    onClick={onCreateButtonClick}
                    whileHover={{
                        rotate: 90,
                        scale: 1.075,
                        transition: {
                            duration: 0.25,
                        },
                    }}
                >
                    <CgMathPlus size={24} />
                </CreateButton>
            )}
        </Container>
    );
};

export default ExplorePageHeader;
