import { useEffect, useState } from 'react';

import ChatCard from '../../components/chat-card/chat-card.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { useFetchMessagesQuery, } from '../../store';
import { PageContainer, Title } from './chats.styles';
import { MessagesNotification } from '../../types/notifications';
import Skeleton from '../../components/Skeleton';
import Fuse from 'fuse.js';

export const ChatsPage = () => {
    const [searchValue, setSearchValue] = useState('');


    const { data: _groups, isLoading, error } = useFetchMessagesQuery(undefined);
    const data = _groups || [];

    const [groups, setGroups] = useState(data);
    useEffect(() => {
        setGroups(data);
    }, [data]);
    const handleChangeSearchValue = (value: string) => {
        setSearchValue(value);
        const fuseOptions = {
            keys: ['Group.GroupTitle'],
            includeScore: true,
        };
        const fuse = new Fuse(data, fuseOptions);
        const results = fuse.search(searchValue);
        const filteredSearch =
            value === '' ? data : results.map((result) => result.item);
        setGroups(filteredSearch);
    };

    return (
        <PageContainer>
            <Title> Chats</Title>
            <ExplorePageHeader
                placeholder="Search chats..."
                searchValue={searchValue}
                onSearchValueChange={handleChangeSearchValue}
                WithoutButton
            />
            {isLoading ? (
              <div className="h-auto w-full flex justify-center flex-col items-center gap-2">
              <Skeleton times={3} className="h-[120px] w-[80%]" />
          </div>    
            ) : error ? (
                <div>Error</div>
            ) : groups?.length || 0 > 0 ? (
                groups?.map((group: Partial<MessagesNotification>) => <ChatCard {...group} />)
            ) : (
                <div>No groups found.</div>
            )}
        </PageContainer>
    );
};
