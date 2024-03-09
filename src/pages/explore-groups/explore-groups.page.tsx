import { useEffect, useState } from 'react';

import CreateGroupModal from '../../components/CreateGroupModal';
import Spinner from '../../components/Spinner';
import GroupCard from '../../components/chat-group-card/chat-group-card.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { PageTitle } from '../../index.styles';
import { useGetAllGroupsQuery } from '../../store';
import { ReceivedGroup } from '../../types/group';
import { Response } from '../../types/response';
import { GroupsGrid, PageContainer } from './explore-groups.style';
import { useSelector } from 'react-redux';
import Fuse from 'fuse.js';

const ExploreGroupsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
    const { data, isLoading } = useGetAllGroupsQuery();
    let groups: ReceivedGroup[] = (data as unknown as Response)?.data ?? [];
    const userId = useSelector((state: any) => state.auth.user.user_id) as string;
    const [showGroups, setGroups] = useState<ReceivedGroup[]>([]);
    const filteredGroups = groups.filter((group) => {
        const isUserAssigned = group.GroupMembers.some((member) => member.ID === userId);
        return !isUserAssigned;
      });
      
      useEffect(() => {
        setGroups(filteredGroups);
      }, [groups, userId]);

    const handleSearchValueChange = (value: string) => {
        setSearchValue(value);
        const fuseOptions = {
            keys: ['title'],
            includeScore: true,
            threshold: 0.5,
        };
        const fuse = new Fuse(filteredGroups, fuseOptions);
        const results = fuse.search(searchValue);
        const filteredSearch = value === '' ? filteredGroups : results.map((result) => result.item);
        setGroups(filteredSearch);
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
                {showGroups.map((group) => (
                    <GroupCard {...group} />
                ))}
            </GroupsGrid>
        </PageContainer>
    );
};

export default ExploreGroupsPage;
