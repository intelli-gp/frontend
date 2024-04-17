import { ReceivedArticle } from './article';
import { ReceivedGroup } from './group';
import { ReceivedUser } from './user';

export type GeneralSearchData = {
    articles: ReceivedArticle[];
    users: ReceivedUser[];
    groups: ReceivedGroup[];
};

export type SUGGESTION_TYPE = 'article' | 'group' | 'user' | 'all';
