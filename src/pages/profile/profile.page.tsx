import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { LuDot } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import cameraImage from '../../assets/imgs/camera.png';
import coverImageCamera from '../../assets/imgs/coverImageCamera.png';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Spinner from '../../components/Spinner';
import Button from '../../components/button/button.component';
import GroupCard from '../../components/chat-group-card/chat-group-card.component';
import { Modal } from '../../components/modal/modal.component';
import OpenImage from '../../components/openImage/openImage.component';
import UserItem from '../../components/user-Item/user-item.component';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import { useUploadImage } from '../../hooks/uploadImage.hook';
import { BetweenPageAnimation } from '../../index.styles';
import {
    AboutListItemText,
    EmptyContent,
    FollowButton,
    GroupsContainer,
    MainContainer,
    PageContainer,
    PageHeader,
    PictureOverlay,
    ProfilePictureContainer,
    UserBio,
    UserDataContainer,
    UserFullName,
    UserHeadline,
    UserUserName,
} from '../../pages/profile/profile.styles';
import {
    RootState,
    setCredentials,
    useGetFollowersQuery,
    useGetFollowingQuery,
    useGetUserArticlesQuery,
    useGetUserGroupsQuery,
    useLazyFetchUserQuery,
    useLazyGetFollowersQuery,
    useLazyGetFollowingQuery,
    useToggleFollowUserMutation,
    useUpdateUserMutation,
} from '../../store';
import { useFetchSpecificUsersRecommendationQuery } from '../../store/apis/recommendationApi';
import { ReceivedArticle } from '../../types/article.d';
import { GroupWithRole, ReceivedGroup } from '../../types/group';
import { ReceivedUser, UserToSend } from '../../types/user';
import { errorToast, successToast } from '../../utils/toasts';
import { ContactInfoLink } from './profile.styles';
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { token, user: storedUser } = useSelector(
        (state: RootState) => state.auth,
    );

    /**
     * Check if the user is viewing another user's profile
     */
    const isAnotherUserProfile = window.location.pathname.includes('/user/');
    const anotherUserUsername = useParams().username;

    const { isLoading: isImageLoading, trigger: uploadImage } =
        useUploadImage();
    const [
        getUserData,
        { data: _anotherUserData, isLoading: anotherUserIsLoading },
    ] = useLazyFetchUserQuery();
    const [getFollowers, { data: __followers }] = useLazyGetFollowersQuery();
    const [getFollowing, { data: __following }] = useLazyGetFollowingQuery();
    const [updateUser, { isLoading: updateUserIsLoading }] =
        useUpdateUserMutation();
    const { data: _articles } = useGetUserArticlesQuery();
    const { data: _groups } = useGetUserGroupsQuery();
    const { data: _followers } = useGetFollowersQuery(storedUser?.ID!);
    const { data: _following } = useGetFollowingQuery(storedUser?.ID!);
    const [toggleFollowUser, { isLoading: followUserIsLoading }] =
        useToggleFollowUserMutation();

    const loggedInUserArticles: ReceivedArticle[] = _articles?.data ?? [];
    const loggedInUserGroups: ReceivedGroup[] = _groups?.data ?? [];
    const loggedInUserFollowers = _followers?.data?.Results as ReceivedUser[];
    const loggedInUserFollowing = _following?.data?.Results as ReceivedUser[];
    const anotherUserFollowers = __followers?.data?.Results as ReceivedUser[];
    const anotherUserFollowing = __following?.data?.Results as ReceivedUser[];
    const followers = isAnotherUserProfile
        ? anotherUserFollowers
        : loggedInUserFollowers;
    const following = isAnotherUserProfile
        ? anotherUserFollowing
        : loggedInUserFollowing;
    const anotherUserData: ReceivedUser = _anotherUserData?.data?.user ?? {};

    const [loggedInUserProfileImage, setLoggedInUserProfileImage] = useState(
        storedUser.ProfileImage,
    );
    const [loggedInUserCoverImage, setLoggedInUserCoverImage] = useState(
        storedUser.CoverImage,
    );
    const [showCoverModal, setCoverModal] = useState(false);
    const [showImgModal, setImgModal] = useState(false);
    const [contactInfoModal, setContactInfoModal] = useState(false);
    const [userData, setUserData] = useState<Partial<ReceivedUser>>({});
    const [userGroups, setUserGroups] = useState<Partial<ReceivedGroup>[]>([]);
    const [userArticles, setUserArticles] = useState<
        Partial<ReceivedArticle>[]
    >([]);
    const [mainSectionHeaderTabs, setMainSectionHeaderTabs] = useState([
        { title: 'Posts', isActive: false, label: 'posts' },
        { title: 'Groups', isActive: true, label: 'groups' },
        { title: 'Followers', isActive: false, label: 'followers' },
        { title: 'Following', isActive: false, label: 'following' },
    ]);

    /**
     * Check if the other user is followed by me
     */
    const isFollowedByMe = (username: string) =>
        loggedInUserFollowing?.some((user) => {
            return user.Username === username;
        });

    // TODO: change this when social network is implemented
    const { data: usersRecommendation } =
        useFetchSpecificUsersRecommendationQuery({
            searchTerm: storedUser.Username + '',
            limit: 5,
            offset: 0,
        });

    const youMayKnow = usersRecommendation?.data?.Results as ReceivedUser[];

    const [CommonFollowers] = useState<any[]>([
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
        {
            FullName: 'Ahmed',
            Username: 'ahmedali',
            ProfileImage: defaultUserImage,
        },
    ]);

    let groupsWithRole: GroupWithRole[] = userGroups?.map(
        (group: Partial<ReceivedGroup>) => {
            if (group?.GroupOwner?.ID === userData.ID)
                return { ...group, UserRole: 'owner' };
            const userRole = group?.GroupMembers?.find(
                (member) => member.ID === userData.ID,
            )?.Type;
            return {
                ...group,
                UserRole: userRole?.toLocaleLowerCase() ?? 'member',
            };
        },
    );

    const aboutListItems = [
        {
            icon: <FaEnvelope />,
            text: userData.Email,
        },
        {
            icon: <FaPhoneAlt />,
            text: userData.PhoneNumber,
        },
        {
            icon: <FaCalendarAlt title={'Birthday'} />,
            text: moment(new Date(userData?.DOB || Date.now())).format(
                'MMMM Do YYYY',
            ),
        },
    ];

    // For logged in user profile
    useEffect(() => {
        setLoggedInUserProfileImage(storedUser.ProfileImage!);
        setLoggedInUserCoverImage(storedUser.CoverImage!);
    }, [storedUser.ProfileImage, storedUser.CoverImage]);

    useEffect(() => {
        if (isAnotherUserProfile) {
            setUserData(anotherUserData);
            setUserGroups(anotherUserData.GroupsJoined);
            setUserArticles(anotherUserData.Articles);
        } else {
            setUserData(storedUser);
            setUserGroups(loggedInUserGroups);
            setUserArticles(loggedInUserArticles);
        }
    }, [_anotherUserData, _articles, _groups, location]);

    useEffect(() => {
        if (isAnotherUserProfile && anotherUserUsername) {
            getUserData(anotherUserUsername)
                .unwrap()
                .then((res) => {
                    getFollowers(res.data.user.ID);
                    getFollowing(res.data.user.ID);
                });
        }
    }, [anotherUserUsername]);

    const MainContent = () => {
        return mainSectionHeaderTabs.map((tab) => {
            if (!tab.isActive) return null;
            if (tab.title === 'Posts') {
                return userArticles?.length ? (
                    <>
                        {userArticles?.map((article) => (
                            <WideArticleItem
                                {...article}
                                onClick={() =>
                                    navigate(`/app/articles/${article.ID}`)
                                }
                            />
                        ))}
                    </>
                ) : (
                    <EmptyContent>Nothing here.</EmptyContent>
                );
            } else if (tab.title === 'Groups') {
                return groupsWithRole?.length ? (
                    <GroupsContainer>
                        {groupsWithRole?.map((group) => (
                            <GroupCard profilePage={true} {...group} />
                        ))}
                    </GroupsContainer>
                ) : (
                    <EmptyContent>Nothing here.</EmptyContent>
                );
            } else if (tab.title === 'Followers') {
                return followers?.length ? (
                    <ul>{followers?.map((user) => <UserItem {...user} />)}</ul>
                ) : (
                    <EmptyContent>Nothing here.</EmptyContent>
                );
            } else if (tab.title === 'Following') {
                return following?.length ? (
                    <ul>{following?.map((user) => <UserItem {...user} />)}</ul>
                ) : (
                    <EmptyContent>Nothing here.</EmptyContent>
                );
            }
            return <EmptyContent>Nothing here.</EmptyContent>;
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

    const handleUpdate = async () => {
        try {
            const update: Partial<UserToSend> = {};

            if (storedUser?.ProfileImage !== loggedInUserProfileImage) {
                const imageURL = await uploadImage(loggedInUserProfileImage!);
                update.image = imageURL;
                const {
                    data: { updatedUser },
                } = await updateUser(update).unwrap();

                dispatch(
                    setCredentials({
                        user: updatedUser,
                        token: token,
                    }),
                );

                successToast('Image uploaded successfully');
            }
            if (storedUser?.CoverImage !== loggedInUserCoverImage) {
                const imageURL = await uploadImage(loggedInUserCoverImage!);
                update.coverImage = imageURL;
                const {
                    data: { updatedUser },
                } = await updateUser(update).unwrap();

                dispatch(
                    setCredentials({
                        user: updatedUser,
                        token: token,
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

    const handleToggleFollowUser = async (userID: number) => {
        try {
            await toggleFollowUser(userID).unwrap();
            successToast('User followed successfully');
        } catch (error) {
            errorToast('Error occurred while following the user!');
            console.log(error);
        }
    };

    const openImgModal = () => {
        setImgModal((prev) => !prev);
    };

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
            className="items-center"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={`Edit ${title} Image`}
            width="lg"
        >
            <OpenImage
                height="250px"
                width={title === 'Cover' ? '450px' : '250px'}
                value={image}
                onChange={setImage}
                radius={title === 'Cover' ? '5px' : '50%'}
                cover={title === 'Cover' ? 'contain' : 'cover'}
            />

            <div className="flex flex-row-reverse gap-4 w-full mt-4">
                <Button
                    select="primary"
                    loading={isImageLoading || updateUserIsLoading}
                    onClick={handleUpdate}
                >
                    Apply
                </Button>
                <Button
                    select="danger"
                    onClick={() => {
                        setImage(
                            title === 'Cover'
                                ? storedUser.CoverImage!
                                : storedUser.ProfileImage!,
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

    const ContactInfoModal = (
        <Modal
            isOpen={contactInfoModal}
            setIsOpen={setContactInfoModal}
            title={userData.FullName}
        >
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
        </Modal>
    );

    const YouMayKnowSection = (
        <YouMayNowSection>
            <h1 className="text-xl font-semibold">You may know</h1>
            <hr />
            <ul>
                {youMayKnow?.map((user) => {
                    const followedByMe = isFollowedByMe(user.Username);
                    return (
                        <UserItem
                            Username={user.Username}
                            FullName={user.FullName}
                            ProfileImage={user.ProfileImage}
                            actionHandler={() =>
                                handleToggleFollowUser(user.ID)
                            }
                            actionButtonProps={{
                                select: `${
                                    followedByMe ? 'danger' : 'primary'
                                }`,
                                outline: followedByMe,
                            }}
                            action={`${followedByMe ? 'Unfollow' : 'Follow'}`}
                        />
                    );
                })}
            </ul>
        </YouMayNowSection>
    );

    const MutualFollowersSection = (
        <YouMayNowSection>
            <h1 className="text-xl font-semibold text-[var(--gray-700)]">
                Mutual Followers
            </h1>
            <hr />
            <ul>
                {CommonFollowers.map((user) => (
                    <UserItem {...user} />
                ))}
            </ul>
        </YouMayNowSection>
    );

    const EditButton = (
        <Button
            select="warning"
            title="Edit profile"
            className="ml-auto gap-2 !p-4 !text-inherit self-start"
            rounded
            onClick={() => navigate('/app/settings')}
        >
            <FiEdit size={18} />
        </Button>
    );

    const FollowUserButton = () => {
        let followedByMe = isFollowedByMe(userData?.Username ?? 'NONE');
        return (
            <FollowButton
                select={`${followedByMe ? 'danger' : 'primary'}`}
                outline={isFollowedByMe(userData?.Username! ?? 'None')}
                title={`${followedByMe ? 'Unfollow' : 'Follow'}`}
                className="ml-auto"
                onClick={() => handleToggleFollowUser(userData?.ID!)}
                loading={followUserIsLoading}
            >
                {followedByMe ? 'Unfollow' : 'Follow'}
            </FollowButton>
        );
    };

    if (isAnotherUserProfile && anotherUserIsLoading) {
        return <Spinner />;
    }

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageHeader>
                <CoverImageContainer>
                    <PictureOverlay
                        src={coverImageCamera}
                        title="Edit cover image"
                        className={`!rounded-none ${
                            isAnotherUserProfile && 'hidden'
                        }`}
                        onClick={openCoverModal}
                    />
                    <CoverImage
                        src={
                            userData?.CoverImage ??
                            'https://cdn11.bigcommerce.com/s-9uf88xhege/images/stencil/1280x1280/products/1162/50750/montana-cans-montana-black-dark-indigo__66994.1657052664.jpg?c=1?imbypass=on'
                        }
                        alt=""
                    />
                </CoverImageContainer>

                <UserDataContainer>
                    <ProfilePictureContainer>
                        <ProfilePicture
                            src={userData?.ProfileImage ?? defaultUserImage}
                        />
                        <PictureOverlay
                            src={cameraImage}
                            title="Edit profile picture"
                            onClick={openImgModal}
                            className={`${isAnotherUserProfile && 'hidden'}`}
                        />
                    </ProfilePictureContainer>
                    <div className="flex flex-col justify-between overflow-hidden">
                        <UserFullName title={userData.FullName}>
                            {userData.FullName}
                        </UserFullName>
                        <div className="flex">
                            <UserUserName title={userData.Username}>
                                @{userData.Username}
                            </UserUserName>
                            <LuDot />
                            <ContactInfoLink
                                onClick={() => setContactInfoModal(true)}
                            >
                                Contact Info
                            </ContactInfoLink>
                        </div>
                        <UserHeadline title={userData.Headline} lines={2}>
                            {userData.Headline}
                        </UserHeadline>
                    </div>

                    {isAnotherUserProfile ? <FollowUserButton /> : EditButton}
                </UserDataContainer>
            </PageHeader>

            <MainContainer>
                <AboutSection>
                    <h1 className="text-xl font-bold">About</h1>
                    <hr />
                    <UserBio lines={5}>
                        {userData.Bio ?? 'This user has no bio.'}
                    </UserBio>
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
                    <MainSectionContent>{MainContent()}</MainSectionContent>
                </MainSection>

                {isAnotherUserProfile
                    ? MutualFollowersSection
                    : YouMayKnowSection}
            </MainContainer>

            {ContactInfoModal}

            <ModalUploadImage
                isOpen={showImgModal}
                setIsOpen={setImgModal}
                image={loggedInUserProfileImage!}
                setImage={setLoggedInUserProfileImage}
                title="Profile"
            />

            <ModalUploadImage
                isOpen={showCoverModal}
                setIsOpen={setCoverModal}
                image={loggedInUserCoverImage!}
                setImage={setLoggedInUserCoverImage}
                title="Cover"
            />
        </PageContainer>
    );
};

export default ProfilePage;
