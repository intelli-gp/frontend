import { FaPlus } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';

import Button from '../Button';
import { SearchBarContainer } from './explore-page-header.style';

type ExplorePageHeaderProps = {
    searchValue: string;
    onSearchValueChange: (value: string) => void;
    onCreateButtonClick: () => void;
    placeholder?: string;
};

const ExplorePageHeader = ({
    searchValue,
    onSearchValueChange,
    onCreateButtonClick,
    placeholder,
}: ExplorePageHeaderProps) => {
    return (
        <div className="flex w-full items-center gap-2 justify-center">
            <SearchBarContainer>
                <LuSearch />
                <input
                    className="border-none outline-none focus-visible:outline-none flex-1"
                    placeholder={placeholder ?? 'Search...'}
                    value={searchValue}
                    onChange={(e) => onSearchValueChange(e.target.value)}
                />
            </SearchBarContainer>
            <Button
                type="button"
                className="rounded-full"
                onClick={onCreateButtonClick}
            >
                <FaPlus size={12} className="mr-2" /> Create
            </Button>
        </div>
    );
};

export default ExplorePageHeader;
