import { useState } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';

import coverImageCamera from '../../assets/imgs/coverImageCamera.png';
import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import { InputWithoutLabel } from '../../components/Input';
import { TagContainer } from '../../components/tag/tag.styles';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
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
import { IoIosArrowDown } from 'react-icons/io';
import { Modal } from '../../components/modal/modal.component';

const ViewGroupPage = () => {
    const [isEditingInterest, setisEditingInterest] = useState(false);
    const [isEditingDescription, setisEditingDescription] = useState(false);

    const data = {
        title: 'Computer Hackers',
        description:
            'Lorem ipsum dolor sit amet consectetur. Ultrices luctus mi euismod sit quam pulvinar. Eu platea sit aliquam in egestas at volutpat netus. In massa aliquet semper etiam tempor cras hac sit imperdiet. Ornare risus nisl sit vulputate et rhoncus non. Amet libero scelerisque odio aliquet. At sed turpis sollicitudin tortor odio velit. Cursus nunc aliquam odio malesuada in et quis et volutpat. Sit sed viverra metus lorem cursus varius. Aliquam posuere malesuada nunc eleifend amet netus massa ut.',
        cover_image_url: '',
        group_tag: ['programming', 'networking', 'web-dev'],
        admins: ['Alis', 'Youmna'],
        members: ['Alis', 'Youmna', 'Youmna', 'Youmna'],
        membersno: '4',
    };
    const [interests, setInterests] = useState(data.group_tag);

    const [description, setDescription] = useState(data.description);

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal((prev) => !prev);
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
                      
                    >
                        Yes
                    </Button>
                    <Button
                        type="button"
                        className="!px-6"
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
                        {data.title}
                    </h1>
                    <p className="lg:text-2xl text-lg text-white">
                        {data.membersno + ' Members'}
                    </p>
                </div>
                <Button
                    type="button"
                    select="warning"
                    title="Return"
                    className="absolute bottom-8 right-8 text-[#1e1b4b] text-lg font-medium rounded-lg"
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
                                onClick={() => {
                                    setisEditingInterest(
                                        (isEditingInterest) => {
                                            if (isEditingInterest) {
                                            }
                                            return !isEditingInterest;
                                        },
                                    );
                                }}
                            >
                                {isEditingInterest ? (
                                    <FiSave size={21} />
                                ) : (
                                    <FiEdit size={18} />
                                )}
                            </EditButton>
                        </div>
                        <div className="flex gap-2 items-center justify-left mt-4 text-txt">
                            {isEditingInterest ? (
                                <TagsInput2
                                    updateSelectedTags={(tags: string[]) =>
                                        setInterests(tags)
                                    }
                                    availableTags={['happy','start']}
                                    selectedTags={interests}
                                    disabled={!isEditingInterest}
                                />
                            ) : (
                                <>
                                    {data?.group_tag.map((tag) => {
                                        return (
                                            <TagContainer key={tag} size="sm">
                                                {tag}
                                            </TagContainer>
                                        );
                                    })}
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
                                    setisEditingDescription(
                                        (isEditingDescription) => {
                                            if (isEditingDescription) {
                                            }
                                            return !isEditingDescription;
                                        },
                                    );
                                }}
                            >
                                {isEditingDescription ? (
                                    <FiSave size={21} />
                                ) : (
                                    <FiEdit size={18} />
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
                                    multiline="true"
                                    maxLength={1000}
                                    rows={5}
                                />
                            ) : (
                                <>{description}</>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2 items-end">
                        <Button select="danger" outline type="button" onClick={openModal}>Delete Group</Button>
                    </div>
                </LeftPart>
                <RightPart>
                    <p>ADMINS</p>
                    <PeopleContainer>
                        {data.admins.map((admin) => {
                            const [showMenu, setShowMenu] = useState(false);

                            return (
                                <PersonContainer
                                    key={admin}
                                >
                                    <img src={defaultUserImage} />
                                    <span className='flex flex-row items-center gap-2 relative'>
                                        <h1>{admin}</h1>
                                        <Arrow>
                                            <IoIosArrowDown onClick={() => setShowMenu((val) => !val)} />
                                        </Arrow>
                                        {showMenu && (
                                            <Menu>
                                                <div>
                                                <h1>Remove</h1>
                                                </div>
                                                <div>
                                                <h1>Dismiss an admin</h1>
                                                </div>
                                            </Menu>
                                        )}
                                    </span>
                                </PersonContainer>
                            );
                        })}
                    </PeopleContainer>
                    <br />
                    <p>MEMBERS</p>
                    <PeopleContainer>
                    {data.members.map((member) => {
                            const [showMenu, setShowMenu] = useState(false);
                            return (
                                <PersonContainer
                                    key={member}
                                >
                                    <img src={defaultUserImage} />
                                    <span className='flex flex-row items-center gap-2 relative'>
                                        <h1>{member}</h1>
                                        <Arrow>
                                            <IoIosArrowDown onClick={() => setShowMenu((val) => !val)} />
                                        </Arrow>
                                        {showMenu && (
                                            <Menu>
                                                <div>
                                                <h1>Remove</h1>
                                                </div>
                                                <div>
                                                <h1>Add group admin</h1>
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
        </PageContainer>
    );
};

export default ViewGroupPage;
