import Fuse from 'fuse.js';
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
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
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
    FollowIcon,
    GroupsContainer,
    MainContainer,
    ModalButtonsContainer,
    PageContainer,
    PageHeader,
    PictureOverlay,
    ProfilePictureContainer,
    UserBio,
    UserDataContainer,
    UserFullName,
    UserHeadline,
    UserUserName,
    UsersListContainer,
    UsersListContent,
    UsersListHeader,
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
    useUpdateUserMutation,
} from '../../store';
import { useFetchSpecificUsersRecommendationQuery } from '../../store/apis/recommendationApi';
import { ReceivedArticle } from '../../types/article.d';
import { GroupWithRole, ReceivedGroup } from '../../types/group';
import { ReceivedUser, UserToSend } from '../../types/user';
import { errorToast, infoToast, successToast } from '../../utils/toasts';
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

type UploadImageModalProps = {
    /**
     * Modal open state
     */
    isOpen: boolean;
    /**
     * Set modal open state
     */
    setIsOpen: (isOpen: boolean) => void;

    /**
     * Image to be uploaded
     */
    image: string;
    /**
     * Set image to be uploaded
     */
    setImage: (image: string) => void;

    /**
     * Title of the modal
     */
    title: 'Profile' | 'Cover';
};
const UploadImageModal = ({
    isOpen,
    setIsOpen,
    image: newImage,
    setImage: setNewImage,
    title,
}: UploadImageModalProps) => {
    const dispatch = useDispatch();

    const { token, user: storedUser } = useSelector(
        (state: RootState) => state.auth,
    );

    const { isLoading: isImageLoading, trigger: uploadImage } =
        useUploadImage();
    const [updateUser, { isLoading: updateUserIsLoading }] =
        useUpdateUserMutation();

    let userCurrentImage: string;
    if (title === 'Cover') {
        userCurrentImage = storedUser.CoverImage!;
    } else {
        userCurrentImage = storedUser.ProfileImage!;
    }

    const handleUpdate = async () => {
        try {
            const update: Partial<UserToSend> = {};

            if (userCurrentImage === newImage) {
                infoToast('No changes detected');
                return;
            }

            const imageURL = await uploadImage(newImage!);
            if (!imageURL) return;

            if (title === 'Cover') {
                update.coverImage = imageURL;
            } else {
                update.image = imageURL;
            }

            const {
                data: { updatedUser },
            } = await updateUser(update).unwrap();

            dispatch(
                setCredentials({
                    user: updatedUser,
                    token: token,
                }),
            );
            successToast(`${title} image updated successfully`);

            setIsOpen(false);
        } catch {
            errorToast(`Failed to update ${title} image`);
        }
    };

    return (
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
                value={newImage}
                onChange={setNewImage}
                radius={title === 'Cover' ? '5px' : '50%'}
                cover={title === 'Cover' ? 'contain' : 'cover'}
            />

            <ModalButtonsContainer>
                <Button
                    select="primary"
                    className="w-[80px] h-[40px]"
                    loading={isImageLoading || updateUserIsLoading}
                    onClick={handleUpdate}
                >
                    Apply
                </Button>
                <Button
                    select="danger"
                    onClick={() => {
                        setNewImage(
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
            </ModalButtonsContainer>
        </Modal>
    );
};

type UsersListProps = {
    users: ReceivedUser[];
    type: 'Following' | 'Followers';
};
export const UsersListWithSearch = ({ users, type }: UsersListProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [visibleUsers, setVisibleUsers] = useState(users);

    let fuzzy = new Fuse<ReceivedUser>(users, {
        keys: ['Username', 'FullName'],
    });

    const handleSearchValueChange = (newValue: string) => {
        setSearchValue(newValue);
        if (newValue.trim().length === 0) return setVisibleUsers(users);
        let searchResult =
            fuzzy.search(newValue)?.reduce((acc, cur) => {
                acc.push(cur.item);
                return acc;
            }, [] as ReceivedUser[]) ?? [];
        setVisibleUsers(searchResult);
    };

    const iconTitle =
        type === 'Following'
            ? "You'r following this user."
            : 'This user follows you.';

    return (
        <UsersListContainer>
            <UsersListHeader>
                <ExplorePageHeader
                    WithoutButton
                    searchValue={searchValue}
                    onSearchValueChange={handleSearchValueChange}
                />
            </UsersListHeader>
            <UsersListContent>
                {visibleUsers?.map((user) => (
                    <UserItem
                        {...user}
                        emoji={<FollowIcon title={iconTitle} size={18} />}
                    />
                ))}
            </UsersListContent>
        </UsersListContainer>
    );
};

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user: storedUser } = useSelector((state: RootState) => state.auth);

    /**
     * Check if the user is viewing another user's profile
     */
    const isAnotherUserProfile = window.location.pathname.includes('/user/');
    const anotherUserUsername = useParams().username;

    if (anotherUserUsername === storedUser.Username) {
        navigate('/app/profile');
    }

    const [
        getUserData,
        { data: _anotherUserData, isLoading: anotherUserIsLoading },
    ] = useLazyFetchUserQuery();
    const [getFollowers, { data: __followers }] = useLazyGetFollowersQuery();
    const [getFollowing, { data: __following }] = useLazyGetFollowingQuery();
    const { data: _articles } = useGetUserArticlesQuery();
    const { data: _groups } = useGetUserGroupsQuery();
    const { data: _followers } = useGetFollowersQuery(storedUser?.ID!);
    const { data: _following } = useGetFollowingQuery(storedUser?.ID!);

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
    const anotherUserData =
        _anotherUserData?.data?.user ?? ({} as ReceivedUser);

    const [loggedInUserProfileImage, setLoggedInUserProfileImage] = useState(
        storedUser.ProfileImage,
    );
    const [loggedInUserCoverImage, setLoggedInUserCoverImage] = useState(
        storedUser.CoverImage,
    );
    const [coverImageModalIsOpen, setCoverImageModalIsOpen] = useState(false);
    const [profileImageModalIsOpen, setProfileImageModalIsOpen] =
        useState(false);
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

    // TODO: change this when social network is implemented ->> `If implemented hehe`
    const { data: usersRecommendation } =
        useFetchSpecificUsersRecommendationQuery({
            searchTerm: storedUser.Username + '',
            limit: 5,
            offset: 0,
        });

    const youMayKnow = usersRecommendation?.data?.Results as ReceivedUser[];

    const commonFollowers = followers?.filter((follower) => {
        return following?.find((follow) => follow.ID === follower.ID);
    });

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
    }, [_anotherUserData, _articles, _groups, location, storedUser]);

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

    useEffect(() => {
        if (isAnotherUserProfile) {
            document.title = `${anotherUserData.FullName} | Mujedd`;
        } else {
            document.title = `Profile | Mujedd`;
        }

        return () => {
            document.title = 'Mujedd';
        };
    }, [anotherUserData]);

    const MainContent = () => {
        return mainSectionHeaderTabs.map((tab) => {
            if (!tab.isActive) return null;
            let tabContentIsEmpty = true;
            let content: JSX.Element = <></>;
            if (tab.title === 'Posts') {
                tabContentIsEmpty = !userArticles?.length;
                content = (
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
                );
            } else if (tab.title === 'Groups') {
                tabContentIsEmpty = !groupsWithRole?.length;
                content = (
                    <GroupsContainer>
                        {groupsWithRole?.map((group) => (
                            <GroupCard profilePage={true} {...group} />
                        ))}
                    </GroupsContainer>
                );
            } else if (tab.title === 'Followers') {
                tabContentIsEmpty = !followers?.length;
                content = (
                    <UsersListWithSearch users={followers} type="Followers" />
                );
            } else if (tab.title === 'Following') {
                tabContentIsEmpty = !following?.length;
                content = (
                    <UsersListWithSearch users={following} type="Following" />
                );
            }

            if (tabContentIsEmpty) {
                return <EmptyContent>Nothing here.</EmptyContent>;
            }

            return content;
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
                    return (
                        <UserItem
                            Username={user.Username}
                            FullName={user.FullName}
                            ProfileImage={user.ProfileImage}
                            emoji={
                                <FollowButton
                                    AnotherUserID={user.ID}
                                    AnotherUserUserName={user.Username}
                                    small
                                />
                            }
                        />
                    );
                })}
            </ul>
            <div>
                {youMayKnow?.length === 0 && (
                    <EmptyContent className='text-center'>No recommendations found.</EmptyContent>
                )}
            </div>
        </YouMayNowSection>
    );

    const MutualFollowersSection = (
        <YouMayNowSection>
            <h1 className="text-xl font-semibold text-[var(--gray-700)]">
                Mutual Followers
            </h1>
            <hr />
            <ul>
                {commonFollowers?.map((user) => (
                    <UserItem {...user} />
                ))}
            </ul>
            <div>
                {commonFollowers?.length === 0 && (
                    <EmptyContent>No mutual followers.</EmptyContent>
                )}
            </div>
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

    const FollowUserButton = (
        <FollowButton
            AnotherUserUserName={anotherUserData.Username!}
            AnotherUserID={anotherUserData.ID}
        />
    );

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
                        onClick={() => setCoverImageModalIsOpen(true)}
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
                            onClick={() => setProfileImageModalIsOpen(true)}
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

                    {isAnotherUserProfile ? FollowUserButton : EditButton}
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

            <UploadImageModal
                isOpen={profileImageModalIsOpen}
                setIsOpen={setProfileImageModalIsOpen}
                image={loggedInUserProfileImage!}
                setImage={setLoggedInUserProfileImage}
                title="Profile"
            />

            <UploadImageModal
                isOpen={coverImageModalIsOpen}
                setIsOpen={setCoverImageModalIsOpen}
                image={loggedInUserCoverImage!}
                setImage={setLoggedInUserCoverImage}
                title="Cover"
            />
        </PageContainer>
    );
};

export default ProfilePage;
