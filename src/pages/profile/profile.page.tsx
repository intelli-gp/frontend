import { useEffect, useState } from 'react';
import { FaBirthdayCake, FaEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoMdPin } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import cameraImage from '../../assets/imgs/camera.png';
import coverImageCamera from '../../assets/imgs/coverImageCamera.png';
import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import UserItem from '../../components/userItem/user-item.component';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import {
    MainContainer,
    PageContainer,
    PageHeader,
    PictureOverlay,
    ProfilePictureContainer,
    UserDataContainer,
} from '../../pages/profile/profile.styles';
import {
    RootState, useUpdateUserMutation, setCredentials,
} from '../../store';
import { ReceivedArticle } from '../../types/article.d';
import { User, UserToSend } from '../../types/user';
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
import { Modal } from '../../components/modal/modal.component';
import OpenImage from '../../components/openImage/openImage.component';
import { useUploadImage } from '../../hooks/uploadImage.hook';
import { errorToast, successToast } from '../../utils/toasts';

const ProfilePage = () => {
    const [mainSectionHeaderTabs, setMainSectionHeaderTabs] = useState([
        { title: 'Posts', isActive: true, label: 'posts' },
        { title: 'Followers', isActive: false, label: 'followers' },
        { title: 'Following', isActive: false, label: 'following' },
    ]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth.user) as User;
    const userToken = useSelector((state: RootState) => state.auth.token);

    const [userImg, setUserImg] = useState(user.image);
    useEffect(() => {
        setUserImg(user.image);
    }, [user]);

    const [posts] = useState<ReceivedArticle[]>([]);

    const [_followers] = useState<any[]>([]);
    const [_following] = useState<any[]>([]);

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
        return posts.map((post) => <WideArticleItem {...post} />);
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
    const [triggerUpdateUser, { isLoading }] =
        useUpdateUserMutation();
    const handleUpdate = async () => {
        try {
            const update: Partial<UserToSend> = {};

            if (user?.image !== userImg) {
                const imageURL = await uploadImage(userImg);
                update.image = imageURL;
                const { data: { updatedUser } } = await triggerUpdateUser(update).unwrap();

                dispatch(
                    setCredentials({
                        user: updatedUser,
                        token: userToken,
                    })
                );
                successToast("Image uploaded successfully");
            }

            setImgModal(false);
        } catch (error: any) {
            if (error.response?.status === 401) {
                errorToast("Unauthorized. Please log in again.");
            } else {
                errorToast("Error occurred while updating the image!");
            }
        }
    };
    const { isLoading: isImageLoading, trigger: uploadImage } = useUploadImage();
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
            <h1 className='text-[var(--slate-700)] text-[30px]'>Edit Cover Image</h1>
            <div className='flex justify-center w-full'>
                <OpenImage
                    height="280px"
                    width="280px"
                    value={userImg}
                    onChange={(newImage) => setUserImg(newImage)}
                    radius='50%'
                />
            </div>
            <div className='flex flex-row justify-end pt-6 items-center gap-2'>
                <Button
                    type='button'
                    select='primary'
                    loading={isImageLoading || isLoading}
                    onClick={handleUpdate}
                > Apply</Button>
                <Button
                    type='button'
                    select='danger'
                    onClick={() => {
                        setUserImg(user.image)
                        setImgModal(false)
                    }}
                    outline
                    className='border-transparent'
                > Cancel</Button>
            </div>
        </Modal>
    )

    return (
        <PageContainer>
            <PageHeader>
                <CoverImageContainer>
                    <PictureOverlay
                        src={coverImageCamera}
                        title="Edit cover image"
                        className="!rounded-none"
                    />
                    <CoverImage src={defaultCoverImage} />
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
            {modalUploadImage}
        </PageContainer>
    );
};

export default ProfilePage;
