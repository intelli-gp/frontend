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
    EditButton,
    GroupCoverImage,
    GroupCoverImageContainer,
    GroupInfoContainer,
    LeftPart,
    PageContainer,
    PeopleContainer,
    PictureOverlay,
    RightPart,
} from './view-group.styles';

const ViewGroupPage = () => {
    const [isEditingInterest, setisEditingInterest] = useState(false);
    const [isEditingDescription, setisEditingDescription] = useState(false);

    const data = {
        title: 'Computer Hackers',
        description:
            'Lorem ipsum dolor sit amet consectetur. Ultrices luctus mi euismod sit quam pulvinar. Eu platea sit aliquam in egestas at volutpat netus. In massa aliquet semper etiam tempor cras hac sit imperdiet. Ornare risus nisl sit vulputate et rhoncus non. Amet libero scelerisque odio aliquet. At sed turpis sollicitudin tortor odio velit. Cursus nunc aliquam odio malesuada in et quis et volutpat. Sit sed viverra metus lorem cursus varius. Aliquam posuere malesuada nunc eleifend amet netus massa ut.',
        cover_image_url: '',
        group_tag: ['programming', 'networking', 'web-dev'],
        admins: ['user1', 'user2'],
        members: ['user0', 'user1', 'user2', 'user3'],
        membersno: '4',
    };
    const [interests, setInterests] = useState(data.group_tag);

    const [description, setDescription] = useState(data.description);

    return (
        <PageContainer>
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
                    className="absolute bottom-8 right-8 text-[color:var(--slate-800)] text-lg font-medium rounded-lg"
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
                                    availableTags={[]}
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
                        <Button type="button">CLICK</Button>
                    </div>
                </LeftPart>
                <RightPart>
                    <p>ADMINS</p>
                    <PeopleContainer>
                        {data.admins.map((admin) => (
                            <div className=" flex flex-col gap-[8px] justify-center items-center">
                                <img src={defaultUserImage} />
                                <h1>{admin}</h1>
                            </div>
                        ))}
                    </PeopleContainer>
                    <br />
                    <br />
                    <p>MEMBERS</p>
                    <PeopleContainer>
                        {data.members.map((member) => (
                            <div className=" flex flex-col gap-[8px] justify-center items-center">
                                <img src={defaultUserImage} />
                                <h1>{member}</h1>
                            </div>
                        ))}
                    </PeopleContainer>
                </RightPart>
            </GroupInfoContainer>
        </PageContainer>
    );
};

export default ViewGroupPage;
