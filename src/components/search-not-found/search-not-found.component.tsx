import SearchNotFoundSvg from '../../assets/imgs/search-not-found.svg';
import {
    SearchNotFoundContainer,
    SearchNotFoundImage,
    SearchNotFoundSubText,
    SearchNotFoundText,
} from './search-not-found.styles';

export const SearchNotFound = () => {
    return (
        <SearchNotFoundContainer>
            <SearchNotFoundImage src={SearchNotFoundSvg} alt="No Results Found" />
            <SearchNotFoundText>No results found</SearchNotFoundText>
            <SearchNotFoundSubText>
                Try searching for something else
            </SearchNotFoundSubText>
        </SearchNotFoundContainer>
    );
};
