import { useEffect, useState } from "react";
import { PageContainer, Title } from "./chats.styles"
import ExplorePageHeader from "../../components/explore-page-header/explore-page-header.component";
import { useGetUserGroupsQuery } from "../../store";
import { ReceivedGroup } from "../../types/group";
import { Response } from '../../types/response';
import ChatCard from "../../components/chat-card/chat-card.component";


export const ChatsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const handleChangeSearchValue = (value: string) => {
        setSearchValue(value);
    };
    const [userGroups, setUserGroups] = useState<Partial<ReceivedGroup>[]>([]);
    const { data: _groups } = useGetUserGroupsQuery();
    const Groups: ReceivedGroup[] = (_groups as unknown as Response)?.data ?? [];
    useEffect(() => {
        setUserGroups(Groups);
    }, [Groups]);

    return <PageContainer>
        <Title> Chats</Title>
        <ExplorePageHeader
            placeholder="Search chats..."
            searchValue={searchValue}
            onSearchValueChange={handleChangeSearchValue}
            WithoutButton
        />
        {
            userGroups.map((group) => {
                return (
                    <ChatCard {...group} />
                )
            })
        }
    </PageContainer>
}