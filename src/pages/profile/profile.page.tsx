import { useEffect, useState } from 'react';
import { FaBirthdayCake, FaEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import cameraImage from '../../assets/imgs/camera.png';
import coverImageCamera from '../../assets/imgs/coverImageCamera.png';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Skeleton from '../../components/Skeleton';
import Button from '../../components/button/button.component';
import { Modal } from '../../components/modal/modal.component';
import OpenImage from '../../components/openImage/openImage.component';
import UserItem from '../../components/userItem/user-item.component';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import WideGroupCard from '../../components/wide-group-card/wide-group-card.component';
import { useUploadImage } from '../../hooks/uploadImage.hook';
import { BetweenPageAnimation, ModalTitle } from '../../index.styles';
import {
    AboutListItemText,
    MainContainer,
    PageContainer,
    PageHeader,
    PictureOverlay,
    ProfilePictureContainer,
    UserDataContainer,
    UserFullName,
} from '../../pages/profile/profile.styles';
import {
    RootState,
    setCredentials,
    useGetUserArticlesQuery,
    useGetUserGroupsQuery,
    useUpdateUserMutation,
} from '../../store';
import { ReceivedArticle } from '../../types/article.d';
import { ReceivedGroup } from '../../types/group';
import { Response } from '../../types/response';
import { ReceivedUser, UserToSend } from '../../types/user';
import { errorToast, successToast } from '../../utils/toasts';
import {
    AboutList,
    AboutListItem,
    AboutSection,
    MainSection,
    MainSectionContent,
    MainSectionHeader,
    MainSectionHeaderTab,
    YouMayNowSection,
} from './profile.styles';
import {
    CoverImage,
    CoverImageContainer,
    ProfilePicture,
} from './profile.styles';

type ModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    image: string;
    setImage: (image: string) => void;
    title: string;
};

const ProfilePage = () => {
    const [mainSectionHeaderTabs, setMainSectionHeaderTabs] = useState([
        { title: 'Posts', isActive: false, label: 'posts' },
        { title: 'Groups', isActive: true, label: 'groups' },
        { title: 'Followers', isActive: false, label: 'followers' },
        { title: 'Following', isActive: false, label: 'following' },
    ]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(
        (state: RootState) => state.auth.user,
    ) as ReceivedUser;
    const userToken = useSelector((state: RootState) => state.auth.token);
    const [userImg, setUserImg] = useState(user.ProfileImage);
    const [userCover, setUserCover] = useState(user.CoverImage);
    const [_followers] = useState<any[]>([]);
    const [_following] = useState<any[]>([]);
    console.log(user.ID);
    const { data: postsData, isLoading: PostsLoading } =
        useGetUserArticlesQuery();
    const [posts, setArticles] = useState<ReceivedArticle[]>([]);
    const articles: ReceivedArticle[] =
        (postsData as unknown as Response)?.data ?? [];

    const { data: groupData, isLoading: GroupsLoading } =
        useGetUserGroupsQuery();
    const groups: ReceivedGroup[] =
        (groupData as unknown as Response)?.data ?? [];
    const [showGroups, setGroups] = useState<ReceivedGroup[]>([]);

    let groupsEnhanced: Partial<ReceivedGroup> & {
        UserRole: string;
    }[] = groups.map((group: ReceivedGroup) => {
        if (group.GroupOwner.ID === user.ID)
            return { ...group, UserRole: 'owner' };
        const userRole = group.GroupMembers.find(
            (member) => member.ID === user.ID,
        )?.Type;
        return {
            ...group,
            UserRole: userRole?.toLocaleLowerCase() ?? 'member',
        };
    });

    const aboutListItems = [
        {
            icon: <FaBirthdayCake />,
            text: new Date(user.DOB).toLocaleDateString(),
        },
        {
            icon: <FaEnvelope />,
            text: user.Email,
        },
        {
            icon: <FaPhoneAlt />,
            text: user.PhoneNumber,
        },
    ];

    useEffect(() => {
        setUserImg(user.ProfileImage);
        setUserCover(user.CoverImage);
        setGroups(groups);
        setArticles(articles);
    }, [articles, groups, user.ProfileImage, user.CoverImage]);

    const [youMayKnow] = useState<any[]>([
        {
            FullName: 'Ahmed Mohamed Mohamed',
            Username: 'ahmedali',
            ProfileImage: defaultUserImage,
        },
        {
            FullName: 'Ahmed',
            Username: 'ahmedali',
            ProfileImage: defaultUserImage,
        },
        {
            FullName: 'Ahmed',
            Username: 'ahmedali',
            ProfileImage: defaultUserImage,
        },
        {
            FullName: 'Ahmed',
            Username: 'ahmedali',
            ProfileImage: defaultUserImage,
        },
    ]);

    const mainContent = () => {
        return mainSectionHeaderTabs.map((tab) => {
            if (tab.title === 'Posts' && tab.isActive) {
                return PostsLoading ? (
                    <div className="px-8 py-4">
                        <Skeleton times={2} className="h-[180px] w-full mb-4" />
                    </div>
                ) : (
                    <>
                        {posts.map((post) => (
                            <WideArticleItem
                                {...post}
                                onClick={() =>
                                    navigate(`/app/articles/${post.ID}`)
                                }
                            />
                        ))}
                    </>
                );
            }
            if (tab.title === 'Groups' && tab.isActive) {
                return GroupsLoading ? (
                    <div className="px-8 py-4">
                        <Skeleton times={2} className="h-[180px] w-full mb-4" />
                    </div>
                ) : (
                    <>
                        {groupsEnhanced.map((group) => (
                            <WideGroupCard {...group} />
                        ))}
                    </>
                );
            }
            return null;
        });
    };

    const handleMainSectionHeaderTabClick = (index: number) => {
        setMainSectionHeaderTabs(
            mainSectionHeaderTabs.map((tab, i) => {
                if (i === index) {
                    return { ...tab, isActive: true };
                }
                return { ...tab, isActive: false };
            }),
        );
    };
    const [triggerUpdateUser, { isLoading }] = useUpdateUserMutation();
    const handleUpdate = async () => {
        try {
            const update: Partial<UserToSend> = {};

            if (user?.ProfileImage !== userImg) {
                const imageURL = await uploadImage(userImg);
                update.image = imageURL;
                const {
                    data: { updatedUser },
                } = await triggerUpdateUser(update).unwrap();

                dispatch(
                    setCredentials({
                        user: updatedUser,
                        token: userToken,
                    }),
                );
                successToast('Image uploaded successfully');
            }
            if (user?.CoverImage !== userCover) {
                const imageURL = await uploadImage(userCover);
                update.coverImage = imageURL;
                const {
                    data: { updatedUser },
                } = await triggerUpdateUser(update).unwrap();

                dispatch(
                    setCredentials({
                        user: updatedUser,
                        token: userToken,
                    }),
                );
                successToast('Image uploaded successfully');
            }
            setImgModal(false);
            setCoverModal(false);
        } catch (error: any) {
            if (error.response?.status === 401) {
                errorToast('Unauthorized. Please log in again.');
            } else {
                errorToast('Error occurred while updating the image!');
            }
        }
    };
    const { isLoading: isImageLoading, trigger: uploadImage } =
        useUploadImage();
    const [showImgModal, setImgModal] = useState(false);
    const openImgModal = () => {
        setImgModal((prev) => !prev);
    };

    const [showCoverModal, setCoverModal] = useState(false);
    const openCoverModal = () => {
        setCoverModal((prev) => !prev);
    };

    const ModalUploadImage: React.FC<ModalProps> = ({
        isOpen,
        setIsOpen,
        image,
        setImage,
        title,
    }) => (
        <Modal
            className="flex flex-col gap-12"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <ModalTitle>Edit {title} Image</ModalTitle>
            <OpenImage
                height="250px"
                width={title === 'Cover' ? '450px' : '250px'}
                value={image}
                onChange={setImage}
                radius={title === 'Cover' ? '5px' : '50%'}
                cover={title === 'Cover' ? 'contain' : 'cover'}
            />
            <div className="flex flex-row-reverse items-center gap-4">
                <Button
                    type="button"
                    select="primary"
                    loading={isImageLoading || isLoading}
                    onClick={handleUpdate}
                >
                    Apply
                </Button>
                <Button
                    type="button"
                    select="danger"
                    onClick={() => {
                        setImage(
                            title === 'Cover'
                                ? user.CoverImage
                                : user.ProfileImage,
                        );
                        setIsOpen(false);
                    }}
                    outline
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageHeader>
                <CoverImageContainer>
                    <PictureOverlay
                        src={coverImageCamera}
                        title="Edit cover image"
                        className="!rounded-none"
                        onClick={openCoverModal}
                    />
                    {userCover ? (
                        <CoverImage src={userCover} />
                    ) : (
                        <div className="bg-indigo-900 h-[200px]" />
                    )}
                </CoverImageContainer>

                <UserDataContainer>
                    <ProfilePictureContainer>
                        <ProfilePicture src={userImg ?? defaultUserImage} />
                        <PictureOverlay
                            src={cameraImage}
                            title="Edit profile picture"
                            onClick={openImgModal}
                        />
                    </ProfilePictureContainer>
                    <div className="flex flex-col justify-between h-[75px] p-2">
                        <UserFullName title={user.FullName}>
                            {user.FullName}
                        </UserFullName>
                        <p className="text-[var(--gray-600)]">
                            @{user.Username}
                        </p>
                    </div>
                    <Button
                        select="warning"
                        type="button"
                        title="Edit profile"
                        className="ml-auto gap-2 !text-[#172554] !p-4"
                        rounded
                        onClick={() => navigate('/app/settings')}
                    >
                        <FiEdit size={18} />
                    </Button>
                </UserDataContainer>
            </PageHeader>

            <MainContainer>
                <AboutSection>
                    <h1 className="text-xl font-bold">About</h1>
                    <hr />
                    <p>{user.Bio ?? 'This user has no bio.'}</p>
                    <hr />
                    <AboutList>
                        {aboutListItems.map(({ icon, text }) => (
                            <AboutListItem>
                                {icon}
                                <AboutListItemText title={text}>
                                    {text}
                                </AboutListItemText>
                            </AboutListItem>
                        ))}
                    </AboutList>
                </AboutSection>

                <MainSection>
                    <MainSectionHeader>
                        {mainSectionHeaderTabs.map(
                            ({ title, isActive }, index) => (
                                <MainSectionHeaderTab
                                    isActive={isActive}
                                    onClick={() => {
                                        handleMainSectionHeaderTabClick(index);
                                    }}
                                >
                                    {title}
                                </MainSectionHeaderTab>
                            ),
                        )}
                    </MainSectionHeader>
                    <MainSectionContent>{mainContent()}</MainSectionContent>
                </MainSection>

                <YouMayNowSection>
                    <h1 className="text-xl font-semibold">You may know</h1>
                    <hr />
                    <ul className="flex flex-col gap-6">
                        {youMayKnow.map((user) => (
                            <UserItem {...user} action="follow" />
                        ))}
                    </ul>
                </YouMayNowSection>
            </MainContainer>

            <ModalUploadImage
                isOpen={showImgModal}
                setIsOpen={setImgModal}
                image={userImg}
                setImage={setUserImg}
                title="Profile"
            />
            <ModalUploadImage
                isOpen={showCoverModal}
                setIsOpen={setCoverModal}
                image={userCover}
                setImage={setUserCover}
                title="Cover"
            />
        </PageContainer>
    );
};

export default ProfilePage;
