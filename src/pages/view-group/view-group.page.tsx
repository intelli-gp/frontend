import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';
import { GoSync } from 'react-icons/go';
import { MdMessage } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import coverImageCamera from '../../assets/imgs/coverImageCamera.png';
import DeleteSectionModal from '../../components/DeleteGroupModal';
import ExitModal from '../../components/ExitGroupModal';
import Spinner from '../../components/Spinner';
import Button from '../../components/button/button.component';
import UserContainer from '../../components/group-user/group-user.component';
import { CustomInput } from '../../components/input/Input.component';
import { Modal } from '../../components/modal/modal.component';
import OpenImage from '../../components/openImage/openImage.component';
import Tag from '../../components/tag/tag.component';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import { useUploadImage } from '../../hooks/uploadImage.hook';
import { BetweenPageAnimation } from '../../index.styles';
import {
    useGetAllTagsQuery,
    useGetGroupQuery,
    useJoinGroupMutation,
    useUpdateGroupMutation,
} from '../../store';
import { GroupToSend, ReceivedGroup } from '../../types/group';
import { ReceivedUser } from '../../types/user';
import { errorToast, successToast } from '../../utils/toasts';
import {
    EditButton,
    EditableSection,
    EditableSectionBody,
    EditableSectionHeader,
    GroupCoverImage,
    GroupCoverImageContainer,
    GroupInfoContainer,
    GroupTitleHolder,
    LeftPart,
    PageContainer,
    PeopleContainer,
    PictureOverlay,
    RightPart,
    StatusTitle,
} from './view-group.styles';

enum Role {
    member = 'MEMBER',
    admin = 'ADMIN',
    not_member = 'NOTHING',
}

const ViewGroupPage = () => {
    const navigate = useNavigate();
    const [isEditingInterest, setIsEditingInterest] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [showExitModal, setExitModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [interests, setInterests] = useState(['']);
    const [description, setDescription] = useState('');
    const [coverImg, setCoverImg] = useState('');

    const user = useSelector((state: any) => state.auth.user) as ReceivedUser;
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
            const imageChanged = groupData?.GroupCoverImage !== coverImg;
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
            if (imageChanged) {
                const imageURL = await uploadImage(coverImg);
                updatedGroupData.GroupCoverImageUrl = imageURL;
                setImgModal(false);
            }
            if (descriptionChanged || tagsChanged || imageChanged) {
                await updateGroup(updatedGroupData).unwrap();
            }
        } catch (error) {
            errorToast('Error occurred while updating!');
            resetUpdateGroup();
        }
    };

    // Editing Cover Image
    const { isLoading: isImageLoading, trigger: uploadImage } =
        useUploadImage();
    const [showImgModal, setImgModal] = useState(false);

    const openImgModal = () => {
        setImgModal((prev) => !prev);
    };

    const modalUploadImage = (
        <Modal
            className="flex flex-col gap-4"
            isOpen={showImgModal}
            setIsOpen={setImgModal}
            width="lg"
            title="Edit Cover Image"
        >
            <OpenImage
                height="280px"
                value={coverImg}
                onChange={(newImage) => setCoverImg(newImage)}
                radius="5px"
            />
            <div className="flex flex-row justify-end pt-6 items-center gap-2">
                <Button
                    select="primary"
                    loading={isImageLoading}
                    onClick={handleUpdateGroup}
                >
                    Apply
                </Button>
                <Button
                    select="danger"
                    onClick={() => {
                        setCoverImg(groupData.GroupCoverImage);
                        setImgModal(false);
                    }}
                    outline
                    className="!border-transparent"
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );

    // Set the internal states with the fetched data
    useEffect(() => {
        setInterests(groupData?.GroupTags);
        setDescription(groupData?.GroupDescription);
        setCoverImg(groupData?.GroupCoverImage);
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
            select="secondary"
            title="Go to chat room"
            className="!absolute bottom-10 right-10 !rounded-full aspect-square"
            onClick={() => navigate(`/app/chat-room/${groupId}`)}
        >
            <MdMessage size={24} />
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
            select="secondary"
            title="Join"
            className="absolute bottom-8 right-8 px-4"
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
            <GroupCoverImageContainer>
                <GroupCoverImage src={coverImg} />

                {userType === Role.admin && (
                    <PictureOverlay
                        src={coverImageCamera}
                        title="Edit cover image"
                        onClick={openImgModal}
                    />
                )}

                <GroupTitleHolder>
                    <h1 className="lg:text-5xl text-3xl text-white font-bold">
                        {groupData?.GroupTitle}
                    </h1>
                    <p className="lg:text-2xl text-md text-white ml-2">
                        {groupData?.GroupMembers?.length + ' Members'}
                    </p>
                </GroupTitleHolder>

                {userType === Role.admin || userType === Role.member
                    ? chatRoomButton
                    : joinButton}
            </GroupCoverImageContainer>

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
                    <StatusTitle>ADMINS</StatusTitle>
                    <PeopleContainer>
                        {admins.map((admin) => {
                            return (
                                <UserContainer
                                    Admin={userType === Role.admin}
                                    IsMe={admin.ID === user.ID}
                                    Owner={admin.ID === groupData.GroupOwner.ID}
                                    GroupID={groupId}
                                    {...admin}
                                />
                            );
                        })}
                    </PeopleContainer>
                    <br />
                    <StatusTitle>MEMBERS</StatusTitle>
                    <PeopleContainer>
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
                    </PeopleContainer>
                </RightPart>
            </GroupInfoContainer>

            <DeleteSectionModal
                id={groupId}
                showModal={showDeleteModal}
                setShowModal={setDeleteModal}
            />
            <ExitModal
                id={groupId}
                showModal={showExitModal}
                setShowModal={setExitModal}
            />
            {modalUploadImage}
        </PageContainer>
    );
};

export default ViewGroupPage;
