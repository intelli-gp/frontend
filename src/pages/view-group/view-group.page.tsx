import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit, FiSave } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

import coverImageCamera from '../../assets/imgs/coverImageCamera.png';
import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import { InputWithoutLabel } from '../../components/Input';
import { Modal } from '../../components/modal/modal.component';
import { TagContainer } from '../../components/tag/tag.styles';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import {
    useDeleteGroupMutation,
    useGetAllTagsQuery,
    useGetGroupQuery,
    useUpdateGroupMutation,
} from '../../store';
import { ReceivedGroup } from '../../types/group';
import { Response } from '../../types/response';
import { errorToast, successToast } from '../../utils/toasts';
import {
    Arrow,
    EditButton,
    GroupCoverImage,
    GroupCoverImageContainer,
    GroupInfoContainer,
    LeftPart,
    Menu,
    PageContainer,
    PeopleContainer,
    PersonContainer,
    PictureOverlay,
    RightPart,
} from './view-group.styles';

const ViewGroupPage = () => {
    const navigate = useNavigate();
    const [isEditingInterest, setIsEditingInterest] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [interests, setInterests] = useState(['']);
    const [description, setDescription] = useState('');

    const { id: groupId } = useParams();
    const { data, isSuccess: isGroupDataFetched } = useGetGroupQuery(groupId!);
    const { data: allTags } = useGetAllTagsQuery();
    const [
        deleteGroup,
        {
            isLoading: isDeletingGroup,
            isSuccess: groupDeletedSuccessfully,
            reset: resetDeleteGroup,
        },
    ] = useDeleteGroupMutation();
    const [
        updateGroup,
        {
            isSuccess: isGroupUpdatedSuccessfully,
            isLoading: isGroupUpdating,
            isError: isGroupUpdatingError,
            reset: resetUpdateGroup,
        },
    ] = useUpdateGroupMutation();
    const groupData: ReceivedGroup = (data as unknown as Response)?.data[0];
    const admins =
        groupData?.GroupMembers?.filter((member) => member.type === 'ADMIN') ??
        [];
    const members =
        groupData?.GroupMembers?.filter(
            (member) =>
                member.type === 'MEMBER' && member.joining_status === true,
        ) ?? [];

    const openModal = () => {
        setShowModal((prev) => !prev);
    };

    // Set the internal states with the fetched data
    useEffect(() => {
        setInterests(groupData?.GroupTags ?? []);
        setDescription(groupData?.description ?? '');
    }, [isGroupDataFetched]);

    // Toasts handling
    useEffect(() => {}, [
        groupDeletedSuccessfully,
        isGroupUpdatedSuccessfully,
        isGroupUpdatingError,
    ]);

    const handleDeleteGroup = async () => {
        try {
            await deleteGroup(groupId!).unwrap();
            setShowModal(false);
            navigate('/app/groups');
            successToast('Group deleted successfully');
        } catch (error) {
            errorToast('Error occurred while deleting the group');
        }
    };

    const handleUpdateGroup = async () => {
        
    };

    const DeleteSectionModal = (
        <Modal isOpen={showModal} setIsOpen={setShowModal}>
            <div className="flex flex-col gap-8">
                <p className="text-2xl font-bold text-[var(--gray-800)] text-center">
                    Are you sure you want to delete this group?
                </p>
                <div className="flex gap-4 justify-center">
                    <Button
                        className="!px-8"
                        type="button"
                        select="danger"
                        loading={isDeletingGroup}
                        onClick={handleDeleteGroup}
                    >
                        Yes
                    </Button>
                    <Button
                        type="button"
                        className="!px-6"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );

    return (
        <PageContainer>
            {DeleteSectionModal}
            <GroupCoverImageContainer>
                <PictureOverlay
                    src={coverImageCamera}
                    title="Edit cover image"
                />
                <GroupCoverImage src={defaultCoverImage} />
                <div>
                    <h1 className="lg:text-5xl text-3xl text-white">
                        {groupData?.title}
                    </h1>
                    <p className="lg:text-2xl text-lg text-white">
                        {groupData?.GroupMembers?.length + ' Members'}
                    </p>
                </div>
                <Button
                    type="button"
                    select="warning"
                    title="Return"
                    className="absolute bottom-8 right-8 !text-[#1e1b4b] text-lg !font-bold rounded-lg"
                    onClick={() => navigate('/app/groups')}
                >
                    Return
                </Button>
            </GroupCoverImageContainer>
            <GroupInfoContainer>
                <LeftPart>
                    <div>
                        <div className="flex justify-between items-center">
                            <p>Interest</p>
                            <EditButton
                                title="Edit"
                                onClick={() =>
                                    setIsEditingInterest(!isEditingInterest)
                                }
                            >
                                {isEditingInterest ? (
                                    <FiSave size={24} />
                                ) : (
                                    <FiEdit size={24} />
                                )}
                            </EditButton>
                        </div>
                        <div className="flex gap-2 items-center justify-left mt-4 text-txt">
                            {isEditingInterest ? (
                                <TagsInput2
                                    updateSelectedTags={(tags: string[]) =>
                                        setInterests(tags)
                                    }
                                    availableTags={allTags?.data}
                                    selectedTags={interests}
                                    disabled={!isEditingInterest}
                                />
                            ) : (
                                <>
                                    {groupData?.GroupTags?.map((tag) => (
                                        <TagContainer key={tag} size="sm">
                                            {tag}
                                        </TagContainer>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex justify-between items-center">
                            <p>Description</p>
                            <EditButton
                                title="Edit"
                                onClick={() => {
                                    setIsEditingDescription(
                                        (isEditingDescription) => {
                                            if (isEditingDescription) {
                                            }
                                            return !isEditingDescription;
                                        },
                                    );
                                }}
                            >
                                {isEditingDescription ? (
                                    <FiSave size={24} />
                                ) : (
                                    <FiEdit size={24} />
                                )}
                            </EditButton>
                        </div>
                        <div className="flex gap-2 items-center justify-left mt-4 text-txt w-full">
                            {isEditingDescription ? (
                                <InputWithoutLabel
                                    value={description}
                                    onChange={(e: { target: { value: any } }) =>
                                        setDescription(e.target.value)
                                    }
                                    className="rounded-lg resize-none w-full h-full"
                                    multiline
                                    maxLength={1000}
                                    rows={5}
                                />
                            ) : (
                                <> {description} </>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2 items-end">
                        <Button
                            select="danger"
                            outline
                            type="button"
                            onClick={openModal}
                        >
                            Delete Group
                        </Button>
                    </div>
                </LeftPart>
                <RightPart>
                    <p>ADMINS</p>
                    <PeopleContainer>
                        {admins.map((admin) => {
                            return (
                                <PersonContainer key={admin?.username}>
                                    <img alt="" src={defaultUserImage} />
                                    <span className="flex flex-row items-center gap-2 relative">
                                        <h1>{admin?.username}</h1>
                                        <Arrow>
                                            <IoIosArrowDown />
                                        </Arrow>
                                    </span>
                                </PersonContainer>
                            );
                        })}
                    </PeopleContainer>
                    <br />
                    <p>MEMBERS</p>
                    <PeopleContainer>
                        {members.map((member) => {
                            return (
                                <PersonContainer key={member?.username}>
                                    <img alt="" src={defaultUserImage} />
                                    <span className="flex flex-row items-center gap-2 relative">
                                        <h1>{member?.username}</h1>
                                        <Arrow>
                                            <IoIosArrowDown />
                                        </Arrow>
                                    </span>
                                </PersonContainer>
                            );
                        })}
                    </PeopleContainer>
                </RightPart>
            </GroupInfoContainer>
        </PageContainer>
    );
};

export default ViewGroupPage;
