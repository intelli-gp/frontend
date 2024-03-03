import { useState } from 'react';

import CreateGroupModal from '../../components/CreateGroupModal';
import Spinner from '../../components/Spinner';
import GroupCard from '../../components/chat-group-card/chat-group-card.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { PageTitle } from '../../index.styles';
import { useGetAllGroupsQuery } from '../../store';
import { ReceivedGroup } from '../../types/group';
import { Response } from '../../types/response';
import { GroupsGrid, PageContainer } from './explore-groups.style';

const ExploreGroupsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
    const { data, isLoading } = useGetAllGroupsQuery();
    let groups: ReceivedGroup[] = (data as unknown as Response)?.data ?? [];

    const handleSearchValueChange = (value: string) => {
        setSearchValue(value);
        // Todo: filter the groups based on the search value
    };

    const handleCreateButtonClick = () => {
        setCreateGroupModalOpen(true);
    };

    return isLoading ? (
        <Spinner />
    ) : (
        <PageContainer>
            <PageTitle className="text-center">Explore Groups</PageTitle>
            <CreateGroupModal
                isOpen={createGroupModalOpen}
                setIsOpen={setCreateGroupModalOpen}
            />
            <ExplorePageHeader
                placeholder="Search groups..."
                searchValue={searchValue}
                onSearchValueChange={handleSearchValueChange}
                onCreateButtonClick={handleCreateButtonClick}
            />
            <GroupsGrid>
                {groups.map((group) => (
                    <GroupCard {...group} />
                ))}
            </GroupsGrid>
        </PageContainer>
    );
};

export default ExploreGroupsPage;
