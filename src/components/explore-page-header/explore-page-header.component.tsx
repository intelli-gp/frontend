import { FaPlus } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';

import {
    Container,
    CreateButton,
    SearchBarContainer,
} from './explore-page-header.style';

type ExplorePageHeaderProps = {
    searchValue: string;
    onSearchValueChange: (value: string) => void;
    onCreateButtonClick?: () => void;
    placeholder?: string;
    WithoutButton?:boolean;
};

const ExplorePageHeader = ({
    searchValue,
    onSearchValueChange,
    onCreateButtonClick,
    placeholder,
    WithoutButton,
}: ExplorePageHeaderProps) => {
    return (
        <Container>
            <SearchBarContainer>
                <LuSearch />
                <input
                    className="border-none outline-none focus-visible:outline-none flex-1"
                    placeholder={placeholder ?? 'Search...'}
                    value={searchValue}
                    onChange={(e) => onSearchValueChange(e.target.value)}
                />
            </SearchBarContainer>
          {WithoutButton?<></> : <CreateButton select="primary200" onClick={onCreateButtonClick}>
                <FaPlus size={12} className="mr-1" /> Create
            </CreateButton>}
        </Container>
    );
};

export default ExplorePageHeader;
