import { useEffect, useMemo, useState } from 'react';
import { FaBirthdayCake, FaEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoMdPin } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import cameraImage from '../../assets/imgs/camera.png';
import coverImageCamera from '../../assets/imgs/coverImageCamera.png';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import { Modal } from '../../components/modal/modal.component';
import OpenImage from '../../components/openImage/openImage.component';
import UserItem from '../../components/userItem/user-item.component';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import { useUploadImage } from '../../hooks/uploadImage.hook';
import { ModalTitle } from '../../index.styles';
import {
    MainContainer,
    PageContainer,
    PageHeader,
    PictureOverlay,
    ProfilePictureContainer,
    UserDataContainer,
} from '../../pages/profile/profile.styles';
import { Response } from '../../types/response';
import { RootState, setCredentials, useGetAllGroupsQuery, useGetArticlesQuery, useUpdateUserMutation } from '../../store';
import { ReceivedArticle } from '../../types/article.d';
import { User, UserToSend } from '../../types/user';
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
import { ReceivedGroup } from '../../types/group';
import WideGroupCard from '../../components/wide-group-card/wide-group-card.component';
import Skeleton from '../../components/Skeleton';

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

    const user = useSelector((state: RootState) => state.auth.user) as User;
    const userToken = useSelector((state: RootState) => state.auth.token);

    const [userImg, setUserImg] = useState(user.image);
    const [userCover, setUserCover] = useState(user.cover_image);
    const [_followers] = useState<any[]>([]);
    const [_following] = useState<any[]>([]);


    const { data: postsData, isLoading: PostsLoading } = useGetArticlesQuery();
    const [posts, setArticles] = useState<ReceivedArticle[]>([]);
    const receivedData: ReceivedArticle[] = (postsData as unknown as Response)?.data ?? [];
    const filteredPosts = useMemo(() => {
        return receivedData.filter((post) => user.username === post.author.username);
    }, [receivedData, user.user_id]);


    const { data: groupData, isLoading: GroupsLoading } = useGetAllGroupsQuery();
    const groups: ReceivedGroup[] = (groupData as unknown as Response)?.data ?? [];
    const [showGroups, setGroups] = useState<ReceivedGroup[]>([]);
    const filteredGroups = useMemo(() => {
        return groups.filter((group) => {
            const isUserAssigned = group.GroupMembers.some(
                (member) => member.ID === user.user_id
            );
            return isUserAssigned;
        });
    }, [groups, user.user_id]);

    useEffect(() => {
        setUserImg(user.image);
        setUserCover(user.cover_image);
        setGroups(filteredGroups);
        setArticles(filteredPosts);
    }, [filteredPosts, filteredGroups, user.image, user.cover_image]);


    const [youMayKnow] = useState<any[]>([
        {
            full_name: 'Ahmed',
            username: 'ahmedali',
            image: defaultUserImage,
        },
        {
            full_name: 'Ahmed',
            username: 'ahmedali',
            image: defaultUserImage,
        },
        {
            full_name: 'Ahmed',
            username: 'ahmedali',
            image: defaultUserImage,
        },
        {
            full_name: 'Ahmed',
            username: 'ahmedali',
            image: defaultUserImage,
        },
    ]);

    const mainContent = () => {
        return mainSectionHeaderTabs.map((tab) => {
            if (tab.title === "Posts" && tab.isActive) {
                return (PostsLoading ? <div className='px-8 py-4'><Skeleton times={3} className="h-[180px] w-full mb-4" /></div> :                     
                <div className='grid xl:grid-cols-2 gap-4 grid-cols-1'>
                    {posts.map((post) => <WideArticleItem {...post} />)}</div>)
            }
            if (tab.title === "Groups" && tab.isActive) {
                return (GroupsLoading ? <div className='px-8 py-4'><Skeleton times={3} className="h-[180px] w-full mb-4" /></div> :
                    <div className='grid xl:grid-cols-2 gap-4 grid-cols-1'>
                        {showGroups.map((group) => (
                            <WideGroupCard {...group} />
                        ))}
                    </div>)
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

            if (user?.image !== userImg) {
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
            if (user?.cover_image !== userCover) {
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
            className="flex flex-col gap-10"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <ModalTitle>Edit {title} Image</ModalTitle>
            <div className="flex justify-center w-full">
                <OpenImage
                    height="280px"
                    width={title === 'Cover' ? '480px' : '280px'}
                    value={image}
                    onChange={setImage}
                    radius={title === 'Cover' ? '5px' : '50%'}
                    cover={title === 'Cover' ? 'contain' : 'cover'}
                />
            </div>
            <div className="flex flex-row-reverse pt-6 items-center gap-4">
                <Button
                    type="button"
                    select="primary"
                    loading={isImageLoading || isLoading}
                    onClick={handleUpdate}
                    className="w-[102px]"
                >
                    Apply
                </Button>
                <Button
                    type="button"
                    select="danger"
                    onClick={() => {
                        setImage(
                            title === 'Cover' ? user.cover_image : user.image,
                        );
                        setIsOpen(false);
                    }}
                    outline
                    className="border-transparent"
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
    return (
        <PageContainer>
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
                        <h2 className="font-semibold text-[var(--gray-700)] overflow-hidden whitespace-nowrap text-ellipsis 3xs:max-w-[7ch] 3xs:text-2xl md:max-w-full md:text-3xl ">
                            {user.full_name}
                        </h2>
                        <p className="text-[var(--gray-600)]">
                            @{user.username}
                        </p>
                    </div>
                    <Button
                        select="warning"
                        type="button"
                        title="Edit profile"
                        className="ml-auto gap-2 !text-[#172554] !p-4 rounded-full"
                        onClick={() => navigate('/app/settings')}
                    >
                        <FiEdit size={18} />
                    </Button>
                </UserDataContainer>
            </PageHeader>

            <MainContainer>
                <AboutSection>
                    <h1 className="text-xl font-bold text-[var(--gray-700)]">
                        About
                    </h1>
                    <hr />
                    <p className="text-[var(--gray-700)]">
                        {user.bio ?? 'This user has no bio.'}
                    </p>
                    <hr />
                    <AboutList>
                        <AboutListItem>
                            <FaBirthdayCake />
                            {new Date(user.dob).toLocaleDateString()}
                        </AboutListItem>
                        <AboutListItem>
                            <IoMdPin />
                            Cairo, Egypt
                        </AboutListItem>
                        <AboutListItem>
                            <FaEnvelope />
                            {user.email}
                        </AboutListItem>
                        <AboutListItem>
                            <FaPhoneAlt />
                            {user.phone_number}
                        </AboutListItem>
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
                    <h1 className="text-xl font-semibold text-[var(--gray-700)]">
                        You may know
                    </h1>
                    <hr />
                    <ul className="flex flex-col gap-4 ">
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
