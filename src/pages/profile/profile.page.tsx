import { useState } from 'react';
import { FaBirthdayCake, FaEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoMdPin } from 'react-icons/io';

import defaultCoverImage from '../../assets/imgs/defaultCover.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import cameraImage from '../../assets/imgs/camera.png';
import Button from '../../components/Button';
import UserItem from '../../components/userItem/user-item.component';
import WideBlogPost from '../../components/wideBlogPost/wide-blog-post.component';
import {
    MainContainer,
    PageContainer,
    ProfilePictureOverlay,
    UserDataContainer,
} from '../../pages/profile/profile.styles';
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
    const [followers] = useState<any[]>([]);
    const [following] = useState<any[]>([]);
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
            <header>
                <CoverImageContainer>
                    <CoverImage src={defaultCoverImage} />
                    <UserDataContainer>
                        <ProfilePicture src={defaultUserImage} />
                        <ProfilePictureOverlay src={cameraImage} title="Edit profile picture"/>
                        <div className="flex flex-col justify-between h-[75px] p-2">
                            <h1 className="text-3xl font-semibold">
                                Ahmed Ali
                            </h1>
                            <p className="text-gray-500">@ahmedali</p>
                        </div>
                    </UserDataContainer>
                    <Button
                        select="warning"
                        type="button"
                        title="Edit profile"
                        className="absolute right-[1%] bottom-4 gap-2 border-2 rounded-lg !text-[#172554] text-sm !px-4"
                    >
                        Edit profile
                        <FiEdit size={18} />
                    </Button>
                </CoverImageContainer>
            </header>

            <MainContainer>
                <AboutSection>
                    <h1 className="text-xl font-semibold">About</h1>
                    <hr />
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nihil, voluptates.
                    </p>
                    <hr />
                    <AboutList>
                        <AboutListItem>
                            <FaBirthdayCake />
                            August 12, 1999
                        </AboutListItem>
                        <AboutListItem>
                            <IoMdPin />
                            Cairo, Egypt
                        </AboutListItem>
                        <AboutListItem>
                            <FaEnvelope />
                            test@123.com
                        </AboutListItem>
                        <AboutListItem>
                            <FaPhoneAlt />
                            +201234567890
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
                    <h1 className="text-xl font-semibold">You may know</h1>
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
