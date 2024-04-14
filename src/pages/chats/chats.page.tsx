import { useState } from 'react';

import ChatCard from '../../components/chat-card/chat-card.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { useFetchMessagesQuery, } from '../../store';
import { PageContainer, Title } from './chats.styles';
import { MessagesNotification } from '../../types/notifications';
import Skeleton from '../../components/Skeleton';

export const ChatsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const handleChangeSearchValue = (value: string) => {
        setSearchValue(value);
    };

    const { data: _groups, isLoading, error } = useFetchMessagesQuery(undefined);



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
                <div className="h-auto w-full">
                    <Skeleton times={3} className="h-24 w-full" />
                </div>
            ) : error ? (
                <div>Error</div>
            ) : _groups?.length || 0 > 0 ? (
                _groups?.map((group: Partial<MessagesNotification>) => <ChatCard {...group} />)
            ) : (
                <div>No groups found.</div>
            )}
        </PageContainer>
    );
};
