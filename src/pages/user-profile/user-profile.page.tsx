import { useEffect, useMemo, useState } from 'react';
import { FaBirthdayCake, FaEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdPin } from 'react-icons/io';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Skeleton from '../../components/Skeleton';
import UserItem from '../../components/userItem/user-item.component';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import WideGroupCard from '../../components/wide-group-card/wide-group-card.component';
import {
    MainContainer,
    PageContainer,
    PageHeader,
    ProfilePictureContainer,
    UserDataContainer,
} from '../../pages/profile/profile.styles';
import {
    useFetchUserQuery,
    useGetAllGroupsQuery,
    useGetArticlesQuery,
} from '../../store';
import { ReceivedArticle } from '../../types/article.d';
import { ReceivedGroup } from '../../types/group';
import { Response } from '../../types/response';
import {
    AboutList,
    AboutListItem,
    AboutSection,
    MainSection,
    MainSectionContent,
    MainSectionHeader,
    MainSectionHeaderTab,
    YouMayNowSection,
} from './user-profile.styles';
import {
    CoverImage,
    CoverImageContainer,
    ProfilePicture,
} from './user-profile.styles';
import { useParams } from 'react-router-dom';
import Button from '../../components/button/button.component';


const UserProfilePage = () => {
    const [mainSectionHeaderTabs, setMainSectionHeaderTabs] = useState([
        { title: 'Posts', isActive: false, label: 'posts' },
        { title: 'Groups', isActive: true, label: 'groups' },
        { title: 'Followers', isActive: false, label: 'followers' },
        { title: 'Following', isActive: false, label: 'following' },
    ]);
    const { id } = useParams();
    const { data: getUser } = useFetchUserQuery(id || '');
    const user = getUser?.data.user || [];

    const [userImg, setUserImg] = useState(user.ProfileImage);
    const [userCover, setUserCover] = useState(user.CoverImage);
    const [_followers] = useState<any[]>([]);
    const [_following] = useState<any[]>([]);


    const { data: postsData, isLoading: PostsLoading } = useGetArticlesQuery();
    const [posts, setArticles] = useState<ReceivedArticle[]>([]);
    const receivedData: ReceivedArticle[] =
        (postsData as unknown as Response)?.data ?? [];
    const filteredPosts = useMemo(() => {
        return receivedData.filter(
            (post) => user.Username === post?.Author?.Username,
        );
    }, [receivedData, user.ID]);

    const { data: groupData, isLoading: GroupsLoading } =
        useGetAllGroupsQuery();
    const groups: ReceivedGroup[] =
        (groupData as unknown as Response)?.data ?? [];
    const [showGroups, setGroups] = useState<ReceivedGroup[]>([]);
    const filteredGroups = useMemo(() => {
        return groups.filter((group) => {
            const isUserAssigned = group.GroupMembers.some(
                (member) => member.ID === user.ID,
            );
            return isUserAssigned;
        });
    }, [groups, user.ID]);

    useEffect(() => {
        setUserImg(user.ProfileImage);
        setUserCover(user.CoverImage);
        setGroups(filteredGroups);
        setArticles(filteredPosts);
    }, [filteredPosts, filteredGroups, user.ProfileImage, user.CoverImage]);

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

    const mainContent = () => {
        return mainSectionHeaderTabs.map((tab) => {
            if (tab.title === 'Posts' && tab.isActive) {
                return PostsLoading ? (
                    <div className="px-8 py-4">
                        <Skeleton times={3} className="h-[180px] w-full mb-4" />
                    </div>
                ) : (
                    <div className="grid xl:grid-cols-2 gap-4 grid-cols-1">
                        {posts.map((post, index) => (
                            <WideArticleItem key={index}  {...post} />
                        ))}
                    </div>
                );
            }
            if (tab.title === 'Groups' && tab.isActive) {
                return GroupsLoading ? (
                    <div className="px-8 py-4">
                        <Skeleton times={3} className="h-[180px] w-full mb-4" />
                    </div>
                ) : (
                    <div className="grid xl:grid-cols-2 gap-4 grid-cols-1">
                        {showGroups.map((group, index) => (
                            <WideGroupCard key={index}  {...group} />
                        ))}
                    </div>
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

    return (
        <PageContainer>
            <PageHeader>
                <CoverImageContainer>
                    {userCover ? (
                        <CoverImage src={userCover} />
                    ) : (
                        <div className="bg-indigo-900 h-[200px]" />
                    )}
                </CoverImageContainer>
                <UserDataContainer>
                    <ProfilePictureContainer>
                        <ProfilePicture src={userImg ?? defaultUserImage} />
                    </ProfilePictureContainer>
                    <div className="flex flex-col justify-between h-[75px] p-2">
                        <h2 className="font-semibold text-[var(--gray-700)] overflow-hidden whitespace-nowrap text-ellipsis 3xs:max-w-[7ch] 3xs:text-2xl md:max-w-full md:text-3xl ">
                            {user.FullName}
                        </h2>
                        <p className="text-[var(--gray-600)]">
                            @{user.Username}
                        </p>
                    </div>
                    <Button
                        select="primary"
                        type="button"
                        title="Follow"
                        className="ml-auto gap-2 "
                    >
                        Follow
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
                        {user.Bio ?? 'This user has no bio.'}
                    </p>
                    <hr />
                    <AboutList>
                        <AboutListItem>
                            <FaBirthdayCake />
                            {new Date(user.DOB).toLocaleDateString()}
                        </AboutListItem>
                        <AboutListItem>
                            <IoMdPin />
                            Cairo, Egypt
                        </AboutListItem>
                        <AboutListItem>
                            <FaEnvelope />
                            {user.Email}
                        </AboutListItem>
                        <AboutListItem>
                            <FaPhoneAlt />
                            {user.PhoneNumber}
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
                        Mutual Followers
                    </h1>
                    <hr />
                    <ul className="flex flex-col gap-4 ">
                        {CommonFollowers.map((user) => (
                            <UserItem {...user} />
                        ))}
                    </ul>
                </YouMayNowSection>
            </MainContainer>
        </PageContainer>
    );
};

export default UserProfilePage;
