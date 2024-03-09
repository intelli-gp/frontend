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
import {
    useGetAllTagsQuery,
    useGetGroupQuery,
    useJoinGroupMutation,
    useUpdateGroupMutation,
} from '../../store';
import { GroupToSend, ReceivedGroup } from '../../types/group';
import { Response } from '../../types/response';
import { User } from '../../types/user';
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
    const [showExitModal, setExitModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [interests, setInterests] = useState(['']);
    const [description, setDescription] = useState('');
    const [coverImg, setCoverImg] = useState('');

    const user = useSelector((state: any) => state.auth.user) as User;
    const { id: groupId } = useParams();
    const { data, isSuccess: isGroupDataFetched } = useGetGroupQuery(groupId!);
    const { data: allTags } = useGetAllTagsQuery();
    const groupData: ReceivedGroup = (data as unknown as Response)?.data[0];
    const admins =
        groupData?.GroupMembers?.filter((member) => member.type === 'ADMIN') ??
        [];
    const members =
        groupData?.GroupMembers?.filter(
            (member) =>
                member.type === 'MEMBER' && member.joining_status === true,
        ) ?? [];

    const userType =
        groupData?.GroupMembers?.find(
            (member) => member.user_id === user.user_id,
        )?.type || 'NOTHING';

    const [showMenus, setShowMenus] = useState(members.map(() => false));

    //TODO: Need to retrieve the ID of each user to remove or update their status
    const handleArrowClick = (index: number) => {
        setShowMenus((prev) => {
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

    const handleUpdateGroup = async () => {
        try {
            // Check if tags or description changed
            const tagsChanged =
                JSON.stringify(groupData?.GroupTags) !==
                JSON.stringify(interests);
            const descriptionChanged = groupData?.description !== description;
            const imageChanged = groupData?.cover_image_url !== coverImg;
            const updatedGroupData: Partial<GroupToSend> & { id: string } = {
                id: groupData.group_id,
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
                console.log(updatedGroupData);
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
            <h1 className="text-[var(--slate-700)] text-[30px]">
                Edit Cover Image
            </h1>
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
                        setCoverImg(groupData.cover_image_url);
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
        setDescription(groupData?.description);
        setCoverImg(groupData?.cover_image_url);
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

                {userType === 'ADMIN' && (
                    <PictureOverlay
                        src={coverImageCamera}
                        title="Edit cover image"
                        onClick={openImgModal}
                    />
                )}

                <div>
                    <h1 className="lg:text-5xl text-3xl text-white">
                        {groupData?.title}
                    </h1>
                    <p className="lg:text-2xl text-lg text-white">
                        {groupData?.GroupMembers?.length + ' Members'}
                    </p>
                </div>
                {userType === 'ADMIN' || userType === 'MEMBER'
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
                                {userType === 'ADMIN' ? (
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
                                {userType === 'ADMIN' ? (
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
                        {userType === 'ADMIN' ? (
                            deleteButton
                        ) : userType === 'MEMBER' ? (
                            exitButton
                        ) : (
                            <></>
                        )}
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
                                        <h1>
                                            {(admin?.username ?? '').substring(
                                                0,
                                                9,
                                            ) +
                                                ((admin?.username ?? '')
                                                    .length > 9
                                                    ? '...'
                                                    : '')}
                                        </h1>
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
                        {members.map((member, index) => {
                            return (
                                <PersonContainer key={member?.username}>
                                    <img alt="" src={defaultUserImage} />
                                    <span className="flex flex-row items-center gap-2 relative">
                                        <h1>
                                            {(member?.username ?? '').substring(
                                                0,
                                                8,
                                            ) +
                                                ((member?.username ?? '')
                                                    .length > 8
                                                    ? '...'
                                                    : '')}
                                        </h1>
                                        <Arrow>
                                            <IoIosArrowDown
                                                onClick={() =>
                                                    handleArrowClick(index)
                                                }
                                            />
                                        </Arrow>
                                        {showMenus[index] && (
                                            <Menu>
                                                <div>
                                                    <h1>Remove</h1>
                                                </div>
                                                <div>
                                                    <h1>Add an admin</h1>
                                                </div>
                                            </Menu>
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
