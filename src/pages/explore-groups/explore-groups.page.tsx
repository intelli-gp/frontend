import { useState } from 'react';

import CreateGroupModal from '../../components/CreateGroupModal';
import GroupCard from '../../components/chat-group-card/chat-group-card.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { GroupsGrid, PageContainer } from './explore-groups.style';

const ExploreGroupsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);

    const data = [
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url: '',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
        {
            title: 'Group Name',
            description: 'Description for Group 1',
            cover_image_url:
                'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            group_tag: ['programming', 'networking', 'web-dev'],
            group_user: ['user1_1', 'user1_2'],
        },
    ];

    const handleSearchValueChange = (value: string) => {
        setSearchValue(value);
        // Todo: filter the groups based on the search value
    };

    const handleCreateButtonClick = () => {
        setCreateGroupModalOpen(true);
    };

    return (
        <PageContainer>
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
                {data.map((group) => (
                    <GroupCard {...group} />
                ))}
            </GroupsGrid>
        </PageContainer>
    );
};

export default ExploreGroupsPage;
