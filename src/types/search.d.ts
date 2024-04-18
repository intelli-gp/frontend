import { ReceivedArticle } from './article';
import { ReceivedGroup } from './group';
import { ReceivedUser } from './user';

export type GeneralSearchData = {
    articles: ReceivedArticle[];
    users: ReceivedUser[];
    groups: ReceivedGroup[];
};

export type SearchDto = {
    searchTerm: string;
    limit?: number;
    offset?: number;
};

export type AutocompleteDto = {
    searchTerm: string;
    type: 'article' | 'group' | 'user' | 'all';
};
