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

    const { data, isLoading } = useFetchMessagesQuery();

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
    const PageContent = () => {
        if (isLoading) {
            return (
                <ChatsContainer>
                    <Skeleton times={5} className="h-[100px] w-[100%] shrink-0" />
                </ChatsContainer>
            );
        }
        if (groups.length === 0 && searchValue.trim().length) {
            return (
                <EmptyPagePlaceholder
                    variant="empty-search"
                    text={`No chats found for "${searchValue}"`}
                    button={{
                        text: 'Explore Groups',
                        path: '/app/groups',
                    }}
                />
            );
        }
        if (groups.length === 0) {
            return (
                <EmptyPagePlaceholder
                    variant="no-data"
                    text="No chats available"
                    button={{
                        text: 'Explore Groups',
                        path: '/app/groups',
                    }}
                />
            );
        }
        if (groups.length > 0) {
            return (
                <ChatsContainer>
                    {groups.map((group: Partial<MessagesNotification>) => (
                        <ChatCard {...group} />
                    ))}
                </ChatsContainer>
            );
        }
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

            <PageContent />
        </PageContainer>
    );
};

export default ChatsPage;
