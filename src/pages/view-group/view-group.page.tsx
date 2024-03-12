import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';
import { GoSync } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import coverImageCamera from '../../assets/imgs/coverImageCamera.png';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import DeleteSectionModal from '../../components/DeleteGroupModal';
import ExitModal from '../../components/ExitGroupModal';
import { InputWithoutLabel } from '../../components/Input';
import Spinner from '../../components/Spinner';
import { Modal } from '../../components/modal/modal.component';
import OpenImage from '../../components/openImage/openImage.component';
import { TagContainer } from '../../components/tag/tag.styles';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import { useUploadImage } from '../../hooks/uploadImage.hook';
import { ModalTitle } from '../../index.styles';
import {
    useGetAllTagsQuery,
    useGetGroupQuery,
    useJoinGroupMutation,
    usePermissionGroupMutation,
    useUpdateGroupMutation,
} from '../../store';
import { GroupToSend, GroupUser, ReceivedGroup } from '../../types/group';
import { Response } from '../../types/response';
import { ReceivedUser } from '../../types/user';
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
    const { data, isSuccess: isGroupDataFetched } = useGetGroupQuery(groupId!);
    const { data: allTags } = useGetAllTagsQuery();
    const groupData: ReceivedGroup = (data as unknown as Response)?.data[0];
    const admins =
        groupData?.GroupMembers?.filter(
            (member) => member.Type === Role.admin,
        ) ?? [];
    const members =
        groupData?.GroupMembers?.filter(
            (member) => member.Type === Role.member,
        ) ?? [];

    const userType =
        groupData?.GroupMembers?.find((member) => member.ID === user.ID)
            ?.Type || Role.not_member;

    const [memberMenus, setMemberMenus] = useState(members.map(() => false));
    const handleMemberClick = (index: number) => {
        setMemberMenus((prev) => {
            const updatedShowMenus = [...prev];
            updatedShowMenus[index] = !updatedShowMenus[index];
            return updatedShowMenus;
        });
    };
    const [adminMenus, setAdminMenus] = useState(admins.map(() => false));
    const handleAdminClick = (index: number) => {
        setAdminMenus((prev) => {
            const updatedShowMenus = [...prev];
            updatedShowMenus[index] = !updatedShowMenus[index];
            return updatedShowMenus;
        });
    };
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
            navigate('/app/chat-room');
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
    const [updateStatus] = usePermissionGroupMutation();
    const handleStatus = async (
        id: string | undefined,
        type: 'ADMIN' | 'MEMBER',
    ) => {
        try {
            const updatedGroupData: Partial<GroupUser> & { id: string } = {
                id: groupData.ID,
                ID: id,
                Type: type,
            };
            await updateStatus(updatedGroupData).unwrap();
            successToast('Changed the permission successfully!');
        } catch (error) {
            errorToast('Error occurred while giving permission!');
        }
    };
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
        >
            <ModalTitle>Edit Cover Image</ModalTitle>
            <OpenImage
                height="280px"
                value={coverImg}
                onChange={(newImage) => setCoverImg(newImage)}
                radius="5px"
            />
            <div className="flex flex-row justify-end pt-6 items-center gap-2">
                <Button
                    type="button"
                    select="primary"
                    loading={isImageLoading}
                    onClick={handleUpdateGroup}
                >
                    Apply
                </Button>
                <Button
                    type="button"
                    select="danger"
                    onClick={() => {
                        setCoverImg(groupData.GroupCoverImage);
                        setImgModal(false);
                    }}
                    outline
                    className="border-transparent"
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

    const returnButton = (
        <Button
            type="button"
            select="secondary"
            title="Return"
            className="absolute bottom-8 right-8"
            onClick={() => navigate('/app/chat-room')}
        >
            Return
        </Button>
    );

    const deleteButton = (
        <Button select="danger" outline type="button" onClick={openDeleteModal}>
            Delete Group
        </Button>
    );

    const exitButton = (
        <Button select="danger" outline type="button" onClick={openExitModal}>
            Exit Group
        </Button>
    );

    const joinButton = (
        <Button
            type="button"
            select="secondary"
            title="Return"
            className="absolute bottom-8 right-8 px-4"
            loading={isGroupUpJoining}
            onClick={handleJoiningGroup}
        >
            Join
        </Button>
    );

    return !isGroupDataFetched ? (
        <Spinner />
    ) : (
        <PageContainer>
            <GroupCoverImageContainer>
                <GroupCoverImage src={coverImg} />

                {userType === Role.admin && (
                    <PictureOverlay
                        src={coverImageCamera}
                        title="Edit cover image"
                        onClick={openImgModal}
                    />
                )}

                <div>
                    <h1 className="lg:text-5xl text-3xl text-white">
                        {groupData?.GroupTitle}
                    </h1>
                    <p className="lg:text-2xl text-lg text-white">
                        {groupData?.GroupMembers?.length + ' Members'}
                    </p>
                </div>
                {userType === Role.admin || userType === Role.member
                    ? returnButton
                    : joinButton}
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
                        </div>
                        <div className="flex gap-2 items-center justify-left mt-4 text-txt">
                            {isEditingInterest ? (
                                <TagsInput2
                                    updateSelectedTags={(tags: string[]) =>
                                        setInterests(tags)
                                    }
                                    availableTags={allTags?.data}
                                    selectedTags={interests}
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
                        {userType === Role.admin ? (
                            deleteButton
                        ) : userType === Role.member ? (
                            exitButton
                        ) : (
                            <></>
                        )}
                    </div>
                </LeftPart>
                <RightPart>
                    <p>ADMINS</p>
                    <PeopleContainer>
                        {admins.map((admin, index) => {
                            return (
                                <PersonContainer key={admin?.Username}>
                                    <img
                                        alt=""
                                        src={
                                            admin?.ProfileImage ??
                                            defaultUserImage
                                        }
                                    />
                                    <span className="flex flex-row items-center gap-2 relative">
                                        <h1>
                                            {(admin?.Username ?? '').substring(
                                                0,
                                                9,
                                            ) +
                                                ((admin?.Username ?? '')
                                                    .length > 9
                                                    ? '...'
                                                    : '')}
                                        </h1>
                                        {userType === Role.admin &&
                                        admin.ID !== user.ID ? (
                                            <>
                                                <Arrow>
                                                    <IoIosArrowDown
                                                        onClick={() =>
                                                            handleAdminClick(
                                                                index,
                                                            )
                                                        }
                                                    />
                                                </Arrow>
                                                {adminMenus[index] && (
                                                    <Menu>
                                                        <div
                                                            onClick={() =>
                                                                handleStatus(
                                                                    admin.ID,
                                                                    Role.member,
                                                                )
                                                            }
                                                        >
                                                            <h1>
                                                                Dismiss an admin
                                                            </h1>
                                                        </div>
                                                    </Menu>
                                                )}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </span>
                                </PersonContainer>
                            );
                        })}
                    </PeopleContainer>
                    <br />
                    <p>MEMBERS</p>
                    <PeopleContainer>
                        {members.map((member, index) => {
                            return (
                                <PersonContainer key={member?.Username}>
                                    <img
                                        alt=""
                                        src={
                                            member?.ProfileImage ??
                                            defaultUserImage
                                        }
                                    />
                                    <span className="flex flex-row items-center gap-2 relative">
                                        <h1>
                                            {(member?.Username ?? '').substring(
                                                0,
                                                8,
                                            ) +
                                                ((member?.Username ?? '')
                                                    .length > 8
                                                    ? '...'
                                                    : '')}
                                        </h1>
                                        {userType === Role.admin &&
                                        member.ID !== user.ID ? (
                                            <>
                                                <Arrow>
                                                    <IoIosArrowDown
                                                        onClick={() =>
                                                            handleMemberClick(
                                                                index,
                                                            )
                                                        }
                                                    />
                                                </Arrow>
                                                {memberMenus[index] && (
                                                    <Menu>
                                                        <div
                                                            onClick={() =>
                                                                handleStatus(
                                                                    member.ID,
                                                                    Role.admin,
                                                                )
                                                            }
                                                        >
                                                            <h1>
                                                                Add an admin
                                                            </h1>
                                                        </div>
                                                    </Menu>
                                                )}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </span>
                                </PersonContainer>
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
