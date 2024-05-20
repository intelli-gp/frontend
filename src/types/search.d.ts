import { ReceivedArticle } from './article';
import { ReceivedGroup } from './group';
import { ReceivedUser } from './user';

export interface GeneralSearchData {
    articles: ReceivedArticle[];
    users: ReceivedUser[];
    groups: ReceivedGroup[];
}

export interface SearchDto<T = string> extends PaginationDto {
    searchTerm: T;
}

export interface PaginationDto {
    limit?: number;
    offset?: number;
}

export interface AutocompleteDto {
    searchTerm: string;
    type: 'article' | 'group' | 'user' | 'all';
}
