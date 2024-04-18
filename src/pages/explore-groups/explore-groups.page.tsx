import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateGroupModal from '../../components/CreateGroupModal';
import Spinner from '../../components/Spinner';
import GroupCard from '../../components/chat-group-card/chat-group-card.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    changeGroupsPageSearchInitiated,
    changeGroupsPageSearchQuery,
} from '../../store';
import { useLazyGroupsSearchQuery } from '../../store/apis/searchApi';
import { ReceivedGroup } from '../../types/group';
import { errorToast } from '../../utils/toasts';
import { GroupsGrid, PageContainer, SmallTitle } from './explore-groups.style';

const ExploreGroupsPage = () => {
    const dispatch = useDispatch();

    const { searchTerm, searchInitiated } = useSelector(
        (state: RootState) => state.appState.groupsPage,
    );

    const { UserTags, ID: storedUserId } = useSelector(
        (state: RootState) => state?.auth?.user,
    );

    const [triggerSearch, { data: _receivedGroups, isLoading, isFetching }] =
        useLazyGroupsSearchQuery();
    let groups: ReceivedGroup[] = _receivedGroups?.data ?? [];

    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);

    const searchHandler = async (searchTerm: string) => {
        if (searchTerm.trim().length === 0) return;
        try {
            await triggerSearch({ searchTerm }).unwrap();
            dispatch(changeGroupsPageSearchInitiated(true));
        } catch (error) {
            errorToast('Error occurred while searching.');
            console.error(error);
        }
    };

    const handleSearchValueChange = (value: string) => {
        dispatch(changeGroupsPageSearchQuery(value));
    };

    const handleCreateButtonClick = () => {
        setCreateGroupModalOpen(true);
    };

    useEffect(() => {
        if (searchInitiated) {
            triggerSearch({ searchTerm });
        } else {
            let userTags = UserTags?.join(' ') ?? '';
            triggerSearch({ searchTerm: userTags });
        }
    }, []);

    let pageContent = isFetching ? (
        <Spinner />
    ) : (
        <>
            <SmallTitle>
                {searchInitiated ? `Search results` : 'suggested groups'}
            </SmallTitle>
            <GroupsGrid>
                {groups.map((group) => (
                    <GroupCard
                        key={group.ID}
                        alreadyJoined={
                            group?.GroupMembers?.some(
                                (member) => member?.ID === storedUserId,
                            ) || group?.GroupOwner?.ID === storedUserId
                        }
                        {...group}
                    />
                ))}
            </GroupsGrid>
        </>
    );

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageTitle className="text-center">Explore Groups</PageTitle>
            <CreateGroupModal
                isOpen={createGroupModalOpen}
                setIsOpen={setCreateGroupModalOpen}
            />
            <ExplorePageHeader
                placeholder="Search groups..."
                searchValue={searchTerm}
                onSearchValueChange={handleSearchValueChange}
                onCreateButtonClick={handleCreateButtonClick}
                suggestionsType={'group'}
                searchHandler={searchHandler}
            />
            {pageContent}
        </PageContainer>
    );
};

export default ExploreGroupsPage;
