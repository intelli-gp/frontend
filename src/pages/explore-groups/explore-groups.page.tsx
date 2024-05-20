import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateGroupModal from '../../components/CreateGroupModal';
import Skeleton from '../../components/Skeleton';
import GroupCard from '../../components/chat-group-card/chat-group-card.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import BackendSupportedPagination from '../../components/pagination/pagination.components';
import UpButton from '../../components/up-button/up-button.components';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    changeGroupsPagePaginationPageNumber,
    changeGroupsPageSearchInitiated,
    changeGroupsPageSearchQuery,
} from '../../store';
import { useLazyFetchGeneralGroupsRecommendationQuery } from '../../store/apis/recommendationApi';
import {
    useLazyGroupsSearchQuery,
    usePrefetchSearch,
} from '../../store/apis/searchApi';
import { ReceivedGroup } from '../../types/group';
import { errorToast } from '../../utils/toasts';
import { GroupsGrid, PageContainer, SmallTitle } from './explore-groups.style';

const PAGE_LIMIT = 30;

const ExploreGroupsPage = () => {
    const dispatch = useDispatch();
    const headerRef = useRef<HTMLDivElement>(null);

    const prefetchSearch = usePrefetchSearch('generalSearch');

    const { searchTerm, searchInitiated, paginationPageNumber } = useSelector(
        (state: RootState) => state.appState.groupsPage,
    );

    const { ID: storedUserId } = useSelector(
        (state: RootState) => state?.auth?.user,
    );

    const [
        triggerRecommendations,
        { data: _recommendationsData, isFetching: recommendationIsFetching },
    ] = useLazyFetchGeneralGroupsRecommendationQuery();
    const recommendedGroups =
        (_recommendationsData?.data?.Results as ReceivedGroup[]) ?? [];

    const [
        triggerSearch,
        { data: _searchResults, isFetching: searchIsFetching },
    ] = useLazyGroupsSearchQuery();
    let { Results: searchResults, NumPages } = _searchResults?.data ?? {};

    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);

    const searchHandler = async (searchTerm: string) => {
        if (searchTerm.trim().length === 0) return;
        try {
            await triggerSearch({ searchTerm, limit: PAGE_LIMIT }).unwrap();
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

    const onPageHover = async (page: number) => {
        if (NumPages ?? 0 < page) {
            return;
        }

        prefetchSearch({
            searchTerm,
            limit: PAGE_LIMIT,
            offset: (page - 1) * PAGE_LIMIT,
        });
    };

    const onPageChange = async (page: number) => {
        dispatch(changeGroupsPagePaginationPageNumber(page));

        await triggerSearch({
            searchTerm: searchTerm,
            limit: PAGE_LIMIT,
            offset: (page - 1) * PAGE_LIMIT,
        }).unwrap();

        if (NumPages ?? 0 > page) {
            onPageHover(page + 1); // prefetch next page
        }
    };

    useEffect(() => {
        if (searchInitiated) {
            triggerSearch({ searchTerm, limit: PAGE_LIMIT });
        } else {
            triggerRecommendations({});
        }
    }, []);

    let pageContent =
        searchIsFetching || recommendationIsFetching ? (
            <GroupsSkeleton />
        ) : (
            <GroupsGrid>
                {(searchInitiated ? searchResults : recommendedGroups)?.map(
                    (group) => (
                        <GroupCard
                            key={group.ID}
                            alreadyJoined={
                                group?.GroupMembers?.some(
                                    (member) => member?.ID === storedUserId,
                                ) || group?.GroupOwner?.ID === storedUserId
                            }
                            {...group}
                        />
                    ),
                )}
            </GroupsGrid>
        );

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageTitle className={'text-center'} ref={headerRef}>
                Explore Groups
            </PageTitle>
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
            <UpButton pageHeaderElement={headerRef.current!} />
            <SmallTitle>
                {searchInitiated ? `Search results` : 'suggested groups'}
            </SmallTitle>
            {pageContent}
            {searchInitiated && (
                <BackendSupportedPagination
                    pageSize={PAGE_LIMIT}
                    numOfPages={NumPages ?? 1}
                    currentPage={paginationPageNumber}
                    onPageChange={onPageChange}
                    onPageHover={onPageHover}
                    pageHeaderElement={headerRef.current!}
                    siblingCount={1}
                />
            )}
        </PageContainer>
    );
};

export const GroupsSkeleton = () => {
    return (
        <GroupsGrid>
            {[...Array(150)].map((_, index) => (
                <Skeleton
                    key={index}
                    className="w-[250px] h-[355px] rounded-[0.5rem]"
                />
            ))}
        </GroupsGrid>
    );
};

export default ExploreGroupsPage;
