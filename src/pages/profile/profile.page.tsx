import { useState } from 'react';
import { FaBirthdayCake, FaEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoMdPin } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import cameraImage from '../../assets/imgs/camera.png';
import coverImageCamera from '../../assets/imgs/coverImageCamera.png';
import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import UserItem from '../../components/userItem/user-item.component';
import WideBlogPost from '../../components/wideBlogPost/wide-blog-post.component';
import {
    MainContainer,
    PageContainer,
    PageHeader,
    PictureOverlay,
    ProfilePictureContainer,
    UserDataContainer,
} from '../../pages/profile/profile.styles';
import { RootState } from '../../store';
import { User } from '../../types/user';
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

const ProfilePage = () => {
    const [mainSectionHeaderTabs, setMainSectionHeaderTabs] = useState([
        { title: 'Posts', isActive: true, label: 'posts' },
        { title: 'Followers', isActive: false, label: 'followers' },
        { title: 'Following', isActive: false, label: 'following' },
    ]);
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.auth.user) as User;

    const [posts] = useState<any[]>([
        {
            author: {
                fname: 'Ahmed',
                lname: 'Ali',
                imageUrl: defaultUserImage,
            },
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptates.',
            coverImageUrl: defaultCoverImage,
            createdAt: new Date().toISOString(),
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            author: {
                fname: 'Ahmed',
                lname: 'Ali',
                imageUrl: defaultUserImage,
            },
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptates.',
            coverImageUrl: defaultCoverImage,
            createdAt: new Date().toISOString(),
            tags: ['tag1', 'tag2', 'tag3'],
        },
    ]);

    const [_followers] = useState<any[]>([]);
    const [_following] = useState<any[]>([]);

    const [youMayKnow] = useState<any[]>([
        {
            fname: 'Ahmed',
            lname: 'Ali',
            username: 'ahmedali',
            imageUrl: defaultUserImage,
        },
        {
            fname: 'Ahmed',
            lname: 'Ali',
            username: 'ahmedali',
            imageUrl: defaultUserImage,
        },
        {
            fname: 'Ahmed',
            lname: 'Ali',
            username: 'ahmedali',
            imageUrl: defaultUserImage,
        },
        {
            fname: 'Ahmed',
            lname: 'Ali',
            username: 'ahmedali',
            imageUrl: defaultUserImage,
        },
    ]);

    const mainContent = () => {
        return posts.map((post) => <WideBlogPost {...post} />);
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
                        <ProfilePicture src={user.image ?? defaultUserImage} />
                        <PictureOverlay
                            src={cameraImage}
                            title="Edit profile picture"
                        />
                    </ProfilePictureContainer>
                    <div className="flex flex-col justify-between h-[75px] p-2">
                        <h1 className="font-semibold text-slate-600 overflow-hidden whitespace-nowrap text-ellipsis 3xs:max-w-[7ch] 3xs:text-2xl md:max-w-full md:text-3xl ">
                            {user.full_name}
                        </h1>
                        <p className="text-slate-500">@{user.username}</p>
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
                    <h1 className="text-xl font-semibold text-slate-600">
                        About
                    </h1>
                    <hr />
                    <p className="text-gray-500">
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
                    <h1 className="text-xl font-semibold text-slate-600">
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
        </PageContainer>
    );
};

export default ProfilePage;
