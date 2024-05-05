import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';

import Skeleton from '../../components/Skeleton';
import ChatCard from '../../components/chat-card/chat-card.component';
import EmptyPagePlaceholder from '../../components/empty-page-placeholder/empty-placeholder.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import { useFetchMessagesQuery } from '../../store';
import { MessagesNotification } from '../../types/notifications';
import { ChatsContainer, PageContainer } from './chats.styles';

export const ChatsPage = () => {
    const [searchValue, setSearchValue] = useState('');

    const { data, isLoading, error } = useFetchMessagesQuery();

    const [groups, setGroups] = useState(data ?? []);

    useEffect(() => {
        let sortedData = data?.toSorted((a, b) => {
            return (
                new Date(b?.LastMessage?.CreatedAt ?? Date.now()).getTime() -
                new Date(a?.LastMessage?.CreatedAt ?? Date.now()).getTime()
            );
        });
        setGroups(sortedData ?? []);
    }, [data]);

    const handleChangeSearchValue = (value: string) => {
        setSearchValue(value);
        const fuseOptions = {
            keys: ['Group.GroupTitle'],
            includeScore: true,
        };
        const fuse = new Fuse(data!, fuseOptions);
        const results = fuse.search(searchValue);
        const filteredSearch =
            value === '' ? data : results.map((result) => result.item);
        setGroups(filteredSearch ?? []);
    };

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageTitle> Messages </PageTitle>
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
                <ChatsContainer>
                    {groups?.map((group: Partial<MessagesNotification>) => (
                        <ChatCard {...group} />
                    ))}
                </ChatsContainer>
            ) : (
                <EmptyPagePlaceholder
                    variant="no-data"
                    text={`You have no messages yet!`}
                    button={{
                        text: 'Explore Groups',
                        path: '/app/groups',
                    }}
                />
            )}
        </PageContainer>
    );
};

export default ChatsPage;
