import { FaPlus } from 'react-icons/fa';

import {
    Container,
    CreateButton,
    SearchBarContainer,
    SearchIcon,
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
    searchHandler?: () => void | Promise<void>;
};

const ExplorePageHeader = ({
    searchValue,
    onSearchValueChange,
    onCreateButtonClick,
    placeholder,
    WithoutButton,
    searchHandler,
}: ExplorePageHeaderProps) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === `Enter`) {
            searchHandler && searchHandler();
        }
    };

    return (
        <Container onKeyDown={handleKeyDown}>
            <SearchBarContainer>
                <SearchIcon
                    title={'Search'}
                    onClick={() => {
                        searchHandler && searchHandler();
                    }}
                />
                <input
                    className="border-none outline-none focus-visible:outline-none flex-1"
                    placeholder={placeholder ?? 'Search...'}
                    value={searchValue}
                    onChange={(e) => onSearchValueChange(e.target.value)}
                />
            </SearchBarContainer>
            {WithoutButton ? (
                <></>
            ) : (
                <CreateButton select="primary200" onClick={onCreateButtonClick}>
                    <FaPlus size={12} className="mr-1" /> Create
                </CreateButton>
            )}
        </Container>
    );
};

export default ExplorePageHeader;
