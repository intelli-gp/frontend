import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';
import { GoSync } from 'react-icons/go';
import { MdMessage } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import coverImageCamera from '../../assets/imgs/coverImageCamera.png';
import Spinner from '../../components/Spinner';
import Button from '../../components/button/button.component';
import UserContainer from '../../components/group-user/group-user.component';
import { CustomInput } from '../../components/input/Input.component';
import { Modal, ModalProps } from '../../components/modal/modal.component';
import OpenImage from '../../components/openImage/openImage.component';
import Tag from '../../components/tag/tag.component';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import { useUploadImage } from '../../hooks/uploadImage.hook';
import { BetweenPageAnimation } from '../../index.styles';
import {
    RootState,
    useDeleteGroupMutation,
    useGetAllTagsQuery,
    useGetGroupQuery,
    useJoinGroupMutation,
    useLeaveGroupMutation,
    useUpdateGroupMutation,
} from '../../store';
import { GroupToSend, ReceivedGroup } from '../../types/group';
import { errorToast, infoToast, successToast } from '../../utils/toasts';
import {
    EditButton,
    EditableSection,
    EditableSectionBody,
    EditableSectionHeader,
    GroupCoverImage,
    GroupInfoContainer,
    GroupTitle,
    LeftPart,
    PageContainer,
    PageHeader,
    PictureOverlay,
    RightPart,
    UsersList,
    UsersListContainer,
    UsersSectionTitle,
} from './view-group.styles';

enum Role {
    member = 'MEMBER',
    admin = 'ADMIN',
    not_member = 'NOTHING',
}

type ExitGroupModalProps = {
    id?: string;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const ExitGroupModal = ({
    id,
    showModal,
    setShowModal,
}: ExitGroupModalProps) => {
    const [leaveGroup, { isLoading }] = useLeaveGroupMutation();

    const handleExitGroup = async () => {
        try {
            await leaveGroup(id!).unwrap();
            successToast('Exited the group successfully!');
        } catch (error) {
            errorToast('Error occurred while exiting the group!');
        } finally {
            setShowModal(false);
        }
    };

    return (
        <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            title={'Are you sure you want to exit this group?'}
            width="lg"
        >
            <div className="flex gap-2 flex-row-reverse">
                <Button
                    className="w-[88px] h-[38.5px]"
                    select="danger"
                    outline
                    loading={isLoading}
                    onClick={handleExitGroup}
                >
                    Yes
                </Button>
                <Button className="" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};

type DeleteGroupModalProps = {
    id?: string;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const DeleteSectionModal = ({
    id,
    showModal,
    setShowModal,
}: DeleteGroupModalProps) => {
    const navigate = useNavigate();

    const [deleteGroup, { isLoading }] = useDeleteGroupMutation();

    const handleDeleteGroup = async () => {
        try {
            await deleteGroup(id!).unwrap();
            navigate('/app/groups');
            successToast('Exit the group successfully!');
        } catch (error) {
            errorToast('Error occurred while deleting the group');
        } finally {
            setShowModal(false);
        }
    };

    return (
        <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            width="lg"
            title="Are you sure you want to delete this group?"
        >
            <div className="flex flex-col gap-8">
                <div className="flex gap-2 flex-row-reverse">
                    <Button
                        className="w-[75px] h-[38px]"
                        select="danger"
                        loading={isLoading}
                        onClick={handleDeleteGroup}
                        outline
                    >
                        Yes
                    </Button>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

type UploadImageModalProps = Pick<ModalProps, 'isOpen' | 'setIsOpen'>;
const UploadImageModal = ({ isOpen, setIsOpen }: UploadImageModalProps) => {
    const { id: groupId } = useParams();

    const { data: _groupData } = useGetGroupQuery(Number(groupId!));
    const groupData: ReceivedGroup = _groupData?.data[0];
    const [updateGroupData, { isLoading: groupIsUpdating }] =
        useUpdateGroupMutation();

    const [coverImage, setCoverImage] = useState('');

    useEffect(() => {
        setCoverImage(groupData?.GroupCoverImage);
    }, [_groupData]);

    const handleUpdateGroupImage = async () => {
        if (coverImage === groupData?.GroupCoverImage) {
            setIsOpen(false);
            infoToast('No changes made!');
            return;
        }
        const newCoverImageUrl = await uploadImage(coverImage);
        if (newCoverImageUrl) {
            try {
                await updateGroupData({
                    id: groupData?.ID,
                    GroupCoverImageUrl: newCoverImageUrl,
                }).unwrap();
                successToast('Cover image updated successfully!');
                setIsOpen(false);
            } catch (error) {
                errorToast('Error occurred while updating the cover image!');
            }
        }
    };

    const { isLoading: isImageLoading, trigger: uploadImage } =
        useUploadImage();

    return (
        <Modal
            className="flex flex-col gap-4"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            width="lg"
            title="Edit Cover Image"
        >
            <OpenImage
                height="280px"
                value={coverImage}
                onChange={(newImage) => setCoverImage(newImage)}
                radius="5px"
            />
            <div className="flex flex-row-reverse items-center gap-2">
                <Button
                    select="primary"
                    loading={isImageLoading || groupIsUpdating}
                    onClick={handleUpdateGroupImage}
                    className="!w-[80px] !h-[39px]"
                >
                    Apply
                </Button>
                <Button
                    select="danger"
                    onClick={() => {
                        setCoverImage(groupData.GroupCoverImage);
                        setIsOpen(false);
                    }}
                    outline
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};

const ViewGroupPage = () => {
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.auth.user);

    const [isEditingInterest, setIsEditingInterest] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [showExitModal, setExitModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [interests, setInterests] = useState(['']);
    const [description, setDescription] = useState('');

    const { id: groupId } = useParams();
    const { data, isSuccess: isGroupDataFetched } = useGetGroupQuery(+groupId!);
    const { data: _allTags } = useGetAllTagsQuery();
    const groupData: ReceivedGroup = data?.data[0];
    const admins =
        groupData?.GroupMembers?.filter(
            (member) => member.Type === Role.admin,
        ) ?? [];
    const members =
        groupData?.GroupMembers?.filter(
            (member) => member.Type === Role.member,
        ) ?? [];
    const allTags = _allTags?.data ?? [];

    const userType =
        groupData?.GroupMembers?.find((member) => member.ID === user.ID)
            ?.Type || Role.not_member;

    // DELETE GROUP
    const openDeleteModal = () => {
        setDeleteModal((prev) => !prev);
    };

    //EXIT GROUP
    const openExitModal = () => {
        setExitModal((prev) => !prev);
    };

    // JOINING GROUP
    const [
        joinGroup,
        { isSuccess: isGroupJoinedSuccessfully, isLoading: isGroupUpJoining },
    ] = useJoinGroupMutation();
    const handleJoiningGroup = async () => {
        try {
            await joinGroup(groupId!).unwrap();
            navigate(`/app/chat-room/${groupId}`);
        } catch (error) {
            errorToast('Error occurred while joining the group');
        }
    };

    // UPDATE GROUP
    const [
        updateGroup,
        {
            isSuccess: isGroupUpdatedSuccessfully,
            isLoading: isGroupUpdating,
            reset: resetUpdateGroup,
        },
    ] = useUpdateGroupMutation();

    const handleUpdateGroup = async () => {
        try {
            // Check if tags or description changed
            const tagsChanged =
                JSON.stringify(groupData?.GroupTags) !==
                JSON.stringify(interests);
            const descriptionChanged =
                groupData?.GroupDescription !== description;
            const updatedGroupData: Partial<GroupToSend> & { id: string } = {
                id: groupData.ID,
            };
            if (descriptionChanged) {
                updatedGroupData.GroupDescription = description;
            }
            if (tagsChanged) {
                if (_.difference(interests, groupData.GroupTags).length !== 0)
                    updatedGroupData.AddedGroupTags = _.difference(
                        interests,
                        groupData.GroupTags,
                    );
                if (_.difference(groupData.GroupTags, interests).length !== 0)
                    updatedGroupData.RemovedGroupTags = _.difference(
                        groupData.GroupTags,
                        interests,
                    );
            }
            if (descriptionChanged || tagsChanged) {
                await updateGroup(updatedGroupData).unwrap();
            }
        } catch (error) {
            errorToast('Error occurred while updating!');
            resetUpdateGroup();
        }
    };

    // Editing Cover Image
    const [coverImageModalIsOpen, setCoverImageModalIsOpen] = useState(false);

    const openImgModal = () => {
        setCoverImageModalIsOpen((prev) => !prev);
    };

    // Set the internal states with the fetched data
    useEffect(() => {
        setInterests(groupData?.GroupTags);
        setDescription(groupData?.GroupDescription);
    }, [isGroupDataFetched]);

    // Toasts handling
    useEffect(() => {
        if (isGroupJoinedSuccessfully) {
            successToast('Joined the group successfully!');
        }
        if (isGroupUpdatedSuccessfully) {
            successToast('Updated the group successfully!');
        }
    }, [isGroupJoinedSuccessfully, isGroupUpdatedSuccessfully]);

    useEffect(() => {
        document.title = `${groupData?.GroupTitle} | Mujedd`;
        return () => {
            document.title = 'Mujedd';
        };
    }, [groupData]);

    const chatRoomButton = (
        <Button
            select="warning"
            title="Go to chat room"
            className="!absolute bottom-10 right-10 gap-2 !rounded-xl"
            onClick={() => navigate(`/app/chat-room/${groupId}`)}
        >
            Chat Room <MdMessage size={18} />
        </Button>
    );

    const deleteButton = (
        <Button select="danger" outline onClick={openDeleteModal}>
            Delete Group
        </Button>
    );

    const exitButton = (
        <Button select="danger" outline onClick={openExitModal}>
            Exit Group
        </Button>
    );

    const joinButton = (
        <Button
            select="success"
            title="Join"
            className="absolute bottom-8 right-8 !rounded-xl h-[36px] w-[100px] gap-2"
            loading={isGroupUpJoining}
            onClick={handleJoiningGroup}
        >
            Join
        </Button>
    );

    if (!isGroupDataFetched) {
        return <Spinner />;
    }

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageHeader>
                <GroupCoverImage src={groupData?.GroupCoverImage} />
                {userType === Role.admin && (
                    <PictureOverlay
                        src={coverImageCamera}
                        title="Edit cover image"
                        onClick={openImgModal}
                    />
                )}
                <GroupTitle>
                    <h1 className="lg:text-5xl text-3xl text-white font-bold">
                        {groupData?.GroupTitle}
                    </h1>
                    <p className="lg:text-2xl text-md text-white ml-2">
                        {groupData?.GroupMembers?.length + ' Members'}
                    </p>
                </GroupTitle>
                {userType === Role.admin || userType === Role.member
                    ? chatRoomButton
                    : joinButton}
            </PageHeader>

            <GroupInfoContainer>
                <LeftPart>
                    <EditableSection>
                        <EditableSectionHeader>
                            <h2>Description</h2>
                            <EditButton
                                title="Edit"
                                onClick={() => {
                                    setIsEditingDescription(
                                        !isEditingDescription,
                                    );
                                }}
                            >
                                {userType === Role.admin ? (
                                    isGroupUpdating ? (
                                        <GoSync className="animate-spin" />
                                    ) : isEditingDescription ? (
                                        <FiSave
                                            onClick={handleUpdateGroup}
                                            size={24}
                                        />
                                    ) : (
                                        <FiEdit size={24} />
                                    )
                                ) : (
                                    <></>
                                )}
                            </EditButton>
                        </EditableSectionHeader>

                        <EditableSectionBody>
                            {isEditingDescription ? (
                                <CustomInput
                                    value={description}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => setDescription(e.target.value)}
                                    multiline
                                    limit={512}
                                    maxLength={512}
                                    rows={5}
                                />
                            ) : (
                                <> {description} </>
                            )}
                        </EditableSectionBody>
                    </EditableSection>
                    <EditableSection>
                        <EditableSectionHeader>
                            <h2>Interest</h2>
                            <EditButton
                                title="Edit"
                                onClick={() =>
                                    setIsEditingInterest(!isEditingInterest)
                                }
                            >
                                {userType === Role.admin ? (
                                    isGroupUpdating ? (
                                        <GoSync className="animate-spin" />
                                    ) : isEditingInterest ? (
                                        <FiSave
                                            onClick={handleUpdateGroup}
                                            size={24}
                                        />
                                    ) : (
                                        <FiEdit size={24} />
                                    )
                                ) : (
                                    <></>
                                )}
                            </EditButton>
                        </EditableSectionHeader>

                        <EditableSectionBody>
                            {isEditingInterest ? (
                                <TagsInput2
                                    updateSelectedTags={(tags: string[]) =>
                                        setInterests(tags)
                                    }
                                    availableTags={allTags}
                                    selectedTags={interests}
                                />
                            ) : (
                                <>
                                    {groupData?.GroupTags?.map((tag) => (
                                        <Tag text={tag} size="sm" />
                                    ))}
                                </>
                            )}
                        </EditableSectionBody>
                    </EditableSection>

                    <div className="flex gap-2 items-end mt-auto">
                        {user.ID === groupData.GroupOwner.ID ? (
                            deleteButton
                        ) : userType === Role.member ||
                          userType === Role.admin ? (
                            exitButton
                        ) : (
                            <></>
                        )}
                    </div>
                </LeftPart>

                <RightPart>
                    <UsersListContainer>
                        <UsersSectionTitle>admins</UsersSectionTitle>
                        <UsersList>
                            {admins.map((admin) => {
                                return (
                                    <UserContainer
                                        Admin={userType === Role.admin}
                                        IsMe={admin.ID === user.ID}
                                        Owner={
                                            admin.ID === groupData.GroupOwner.ID
                                        }
                                        GroupID={groupId}
                                        {...admin}
                                    />
                                );
                            })}
                        </UsersList>
                    </UsersListContainer>
                    <UsersListContainer>
                        <UsersSectionTitle>members</UsersSectionTitle>
                        <UsersList>
                            {members.map((member) => {
                                return (
                                    <UserContainer
                                        IsMe={member.ID === user.ID}
                                        Admin={userType === Role.admin}
                                        GroupID={groupId}
                                        {...member}
                                    />
                                );
                            })}
                        </UsersList>
                    </UsersListContainer>
                </RightPart>
            </GroupInfoContainer>

            {/* Modals */}
            <DeleteSectionModal
                id={groupId}
                showModal={showDeleteModal}
                setShowModal={setDeleteModal}
            />
            <ExitGroupModal
                id={groupId}
                showModal={showExitModal}
                setShowModal={setExitModal}
            />
            <UploadImageModal
                isOpen={coverImageModalIsOpen}
                setIsOpen={setCoverImageModalIsOpen}
            />
        </PageContainer>
    );
};

export default ViewGroupPage;
