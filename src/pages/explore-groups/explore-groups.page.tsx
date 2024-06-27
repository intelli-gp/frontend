import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Skeleton from '../../components/Skeleton';
import Button from '../../components/button/button.component';
import GroupCard from '../../components/chat-group-card/chat-group-card.component';
import EmptyPagePlaceholder from '../../components/empty-page-placeholder/empty-placeholder.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { CustomInput } from '../../components/input/Input.component';
import { Modal } from '../../components/modal/modal.component';
import OpenImage from '../../components/openImage/openImage.component';
import BackendSupportedPagination from '../../components/pagination/pagination.components';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import UpButton from '../../components/up-button/up-button.components';
import { useUploadImage } from '../../hooks/uploadImage.hook';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    changeGroupsPagePaginationPageNumber,
    changeGroupsPageSearchInitiated,
    changeGroupsPageSearchQuery,
    useAddGroupMutation,
    useGetAllTagsQuery,
} from '../../store';
import { useLazyFetchGeneralGroupsRecommendationQuery } from '../../store/apis/recommendationApi';
import {
    useLazyGroupsSearchQuery,
    usePrefetchSearch,
} from '../../store/apis/searchApi';
import { ReceivedGroup } from '../../types/group';
import { errorToast, successToast } from '../../utils/toasts';
import { GroupsGrid, PageContainer, SmallTitle } from './explore-groups.style';

const PAGE_LIMIT = 30;

type CreateGroupModalProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};
const CreateGroupModal = ({ isOpen, setIsOpen }: CreateGroupModalProps) => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupImage, setGroupImage] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [addGroup, { isLoading, reset: resetCreatingGroup }] =
        useAddGroupMutation();
    const { isLoading: isImageLoading, trigger: uploadImage } =
        useUploadImage();
    const { data: allTags } = useGetAllTagsQuery();
    let tags = allTags?.data ?? [];

    const resetForm = () => {
        setGroupName('');
        setGroupDescription('');
        setGroupImage('');
        setSelectedTags([]);
    };

    const validateGroupData = () => {
        if (selectedTags.length === 0) {
            return 'Please select at least one tag';
        }
        if (!groupImage) {
            return 'Please add a group cover image';
        }
    };

    const handleCreateGroup = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        let validationError = validateGroupData();
        if (validationError) {
            return errorToast(validationError);
        }
        try {
            const imageURL = await uploadImage(groupImage);
            await addGroup({
                GroupTitle: groupName,
                GroupDescription: groupDescription,
                GroupTags: selectedTags,
                GroupCoverImageUrl: imageURL,
            }).unwrap();
            successToast('Group created successfully');
            resetForm();
        } catch (err) {
            errorToast('Error occurred while creating group');
        } finally {
            setIsOpen(false);
            resetCreatingGroup();
        }
    };

    return (
        <Modal
            className="flex flex-col gap-4"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Create New Group"
            width="lg"
        >
            <OpenImage
                height="250px"
                width="100%"
                radius="0.75rem"
                value={groupImage}
                onChange={(newImage) => setGroupImage(newImage)}
                editButton
            />
            <form className="flex flex-col gap-4" onSubmit={handleCreateGroup}>
                <CustomInput
                    required
                    label={'Group Name'}
                    placeholder={'Enter group name...'}
                    value={groupName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setGroupName(e.target.value)
                    }
                />
                <CustomInput
                    required
                    multiline
                    limit={512}
                    label={'Group Description'}
                    placeholder={'Describe what this groups is about...'}
                    maxLength={512}
                    rows={5}
                    value={groupDescription}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setGroupDescription(e.target.value)
                    }
                />
                <TagsInput2
                    label={'Tags'}
                    availableTags={tags}
                    selectedTags={selectedTags}
                    updateSelectedTags={(tags) => {
                        setSelectedTags(tags);
                    }}
                />
                <div className="flex gap-2 mt-8 flex-row-reverse">
                    <Button
                        type="submit"
                        loading={isImageLoading || isLoading}
                        className="w-[90px] h-[39px]"
                    >
                        Create
                    </Button>
                    <Button
                        select="danger"
                        outline
                        onClick={() => {
                            resetForm();
                            setIsOpen(false);
                        }}
                        title="Discard group creation"
                    >
                        Discard
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

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
        if (!searchInitiated || searchTerm.trim().length === 0) {
            triggerRecommendations({ limit: PAGE_LIMIT });
            dispatch(changeGroupsPageSearchInitiated(false));
        } else {
            searchHandler(searchTerm);
        }
    }, []);

    const PageContent = () => {
        if (searchIsFetching || recommendationIsFetching) {
            return <GroupsSkeleton />;
        }
        if (searchInitiated) {
            if (searchResults?.length === 0) {
                return (
                    <EmptyPagePlaceholder
                        variant={'empty-search'}
                        text={'No groups found, try some other keywords!'}
                    />
                );
            } else {
                return (
                    <GroupsGrid>
                        {searchResults?.map((group) => (
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
                );
            }
        } else {
            if (recommendedGroups?.length === 0) {
                return (
                    <EmptyPagePlaceholder
                        variant={'no-data'}
                        text={
                            'No groups suggestions found, try to search for groups!'
                        }
                    />
                );
            } else {
                return (
                    <GroupsGrid>
                        {recommendedGroups?.map((group) => (
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
                );
            }
        }
    };

    useEffect(() => {
        document.title = 'Explore Groups | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

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
            <PageContent />
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
                    className="w-[250px] h-[356.15px] rounded-[0.5rem]"
                />
            ))}
        </GroupsGrid>
    );
};

export default ExploreGroupsPage;
