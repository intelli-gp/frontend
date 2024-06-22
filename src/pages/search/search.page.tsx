import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

import Skeleton from '../../components/Skeleton';
import GroupCard from '../../components/chat-group-card/chat-group-card.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import { SwiperSlider } from '../../components/swiper/swiper-slider.component';
import UserCard from '../../components/user-card/user-card.component';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import { BetweenPageAnimation } from '../../index.styles';
import {
    RootState,
    changeSearchPageInitiated,
    changeSearchPageQuery,
} from '../../store';
import {
    useLazyFetchGeneralArticlesRecommendationQuery,
    useLazyFetchGeneralGroupsRecommendationQuery,
    useLazyFetchSpecificUsersRecommendationQuery,
} from '../../store/apis/recommendationApi';
import { useLazyGeneralSearchQuery } from '../../store/apis/searchApi';
import { ReceivedArticle } from '../../types/article';
import { ReceivedGroup } from '../../types/group';
import { GeneralSearchData } from '../../types/search';
import { ReceivedUser } from '../../types/user';
import { errorToast } from '../../utils/toasts';
import { ArticlesSkeleton } from '../explore-articles/explore-articles.page';
import {
    ArticleSectionBody,
    ExploreMoreLink,
    PageContainer,
    SearchPageSection,
    SectionTitle,
} from './search.styles';

type SectionProps = {
    isLoading: boolean;
    searchResults: GeneralSearchData;
    recommendations: any[];
    searchInitiated: boolean;
};
const UsersSectionContent = ({
    isLoading,
    searchResults,
    recommendations,
    searchInitiated,
}: SectionProps) => {
    if (isLoading) {
        return <UsersSkeleton />;
    }

    let itemsToShow: ReceivedUser[];

    if (searchInitiated) {
        itemsToShow = searchResults?.users?.slice(0, 10);
    } else {
        itemsToShow = recommendations;
    }

    return (
        <SwiperSlider>
            {itemsToShow?.map((user) => <UserCard {...user} />)}
        </SwiperSlider>
    );
};

const GroupsSectionContent = ({
    isLoading,
    searchResults,
    recommendations,
    searchInitiated,
}: SectionProps) => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (isLoading) {
        return <GroupsSkeleton />;
    }

    let itemsToShow: ReceivedGroup[];

    if (searchInitiated) {
        itemsToShow = searchResults?.groups?.slice(0, 10);
    } else {
        itemsToShow = recommendations;
    }

    return (
        <SwiperSlider>
            {itemsToShow?.map((group) => (
                <GroupCard
                    {...group}
                    alreadyJoined={
                        group?.GroupMembers?.some(
                            (member) => member?.ID === user.ID!,
                        ) || group?.GroupOwner?.ID === user.ID!
                    }
                />
            ))}
        </SwiperSlider>
    );
};

const ArticlesSectionContent = ({
    isLoading,
    searchResults,
    recommendations,
    searchInitiated,
}: SectionProps) => {
    const navigate = useNavigate();
    if (isLoading) {
        return <ArticlesSkeleton />;
    }

    let itemsToShow: ReceivedArticle[];

    if (searchInitiated) {
        itemsToShow = searchResults?.articles?.slice(0, 10);
    } else {
        itemsToShow = recommendations;
    }

    return (
        <ArticleSectionBody>
            {itemsToShow?.map((article) => {
                return (
                    <WideArticleItem
                        {...article}
                        key={article.ID}
                        onClick={() => navigate(`/app/articles/${article.ID}`)}
                    />
                );
            })}
        </ArticleSectionBody>
    );
};

const SearchPage = () => {
    const dispatch = useDispatch();

    const [NoUsersFound, setNoUsersFound] = useState(false);
    const [NoArticlesFound, setNoArticlesFound] = useState(false);
    const [NoGroupsFound, setNoGroupsFound] = useState(false);

    const { Username } = useSelector((state: RootState) => state.auth.user);
    const { searchInitiated, searchTerm } = useSelector(
        (state: RootState) => state.appState.searchPage,
    );

    const [
        triggerSearch,
        { isFetching: generalSearchIsFetching, data: _searchResult },
    ] = useLazyGeneralSearchQuery();
    const searchResult = _searchResult?.data as GeneralSearchData;

    const [
        triggerArticleRecommendation,
        {
            data: _articleRecommendation,
            isFetching: articlesRecommendationIsFetching,
        },
    ] = useLazyFetchGeneralArticlesRecommendationQuery();
    const recommendedArticles =
        (_articleRecommendation?.data?.Results as ReceivedArticle[]) ?? [];

    const [
        triggerGroupsRecommendation,
        {
            data: _groupRecommendation,
            isFetching: groupsRecommendationsIsFetching,
        },
    ] = useLazyFetchGeneralGroupsRecommendationQuery();
    const recommendedGroups =
        (_groupRecommendation?.data?.Results as ReceivedGroup[]) ?? [];

    const [
        triggerUsersRecommendation,
        {
            data: _userRecommendation,
            isFetching: usersRecommendationsIsFetching,
        },
    ] = useLazyFetchSpecificUsersRecommendationQuery();

    const recommendedUsers =
        (_userRecommendation?.data?.Results as ReceivedUser[]) ?? [];

    const handleSearchValueChange = (newValue: string) => {
        dispatch(changeSearchPageQuery(newValue));
    };

    const searchHandler = async (searchTerm: string) => {
        if (searchTerm.trim().length === 0) return;
        try {
            await triggerSearch({ searchTerm }).unwrap();
            dispatch(changeSearchPageInitiated(true));
        } catch (error) {
            errorToast('Error occurred while searching.');
            console.error(error);
        }
    };

    useEffect(() => {
        document.title = 'Search | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    useEffect(() => {
        if (searchInitiated) {
            triggerSearch({ searchTerm });
        } else {
            triggerGroupsRecommendation({});
            triggerArticleRecommendation({});
            triggerUsersRecommendation({ searchTerm: Username! });
        }
    }, []);

    useEffect(() => {
        if (searchInitiated) {
            setNoUsersFound(searchResult?.users?.length === 0);
            setNoArticlesFound(searchResult?.articles?.length === 0);
            setNoGroupsFound(searchResult?.groups?.length === 0);
        } else {
            setNoUsersFound(recommendedUsers?.length === 0);
            setNoArticlesFound(recommendedArticles?.length === 0);
            setNoGroupsFound(recommendedGroups?.length === 0);
        }
    }, [
        generalSearchIsFetching,
        usersRecommendationsIsFetching,
        articlesRecommendationIsFetching,
        groupsRecommendationsIsFetching,
    ]);

    useEffect(() => {
        if (generalSearchIsFetching) {
            setNoArticlesFound(false);
            setNoUsersFound(false);
            setNoGroupsFound(false);
        }
    }, [generalSearchIsFetching]);

    return (
        <PageContainer {...BetweenPageAnimation}>
            <ExplorePageHeader
                WithoutButton
                searchValue={searchTerm}
                onSearchValueChange={handleSearchValueChange}
                searchHandler={searchHandler}
                suggestionsType={'all'}
            />

            <SearchPageSection empty={NoUsersFound}>
                <SectionTitle>
                    {searchInitiated
                        ? 'users search results'
                        : 'Suggested users'}
                </SectionTitle>
                <UsersSectionContent
                    searchInitiated={searchInitiated}
                    recommendations={recommendedUsers}
                    isLoading={
                        usersRecommendationsIsFetching ||
                        generalSearchIsFetching
                    }
                    searchResults={searchResult}
                />
            </SearchPageSection>

            <SearchPageSection empty={NoGroupsFound}>
                <SectionTitle>
                    {searchInitiated
                        ? 'groups search results'
                        : 'Suggested groups'}
                    <ExploreMoreLink to="/app/groups">
                        Explore More
                    </ExploreMoreLink>
                </SectionTitle>
                <GroupsSectionContent
                    searchInitiated={searchInitiated}
                    searchResults={searchResult}
                    recommendations={recommendedGroups}
                    isLoading={
                        generalSearchIsFetching ||
                        groupsRecommendationsIsFetching
                    }
                />
            </SearchPageSection>

            <SearchPageSection empty={NoArticlesFound}>
                <SectionTitle>
                    {searchInitiated
                        ? 'Articles search results'
                        : 'Suggested articles'}
                    <ExploreMoreLink to="/app/articles">
                        Explore More
                    </ExploreMoreLink>
                </SectionTitle>
                <ArticlesSectionContent
                    searchInitiated={searchInitiated}
                    searchResults={searchResult}
                    recommendations={recommendedArticles}
                    isLoading={
                        articlesRecommendationIsFetching ||
                        generalSearchIsFetching
                    }
                />
            </SearchPageSection>
        </PageContainer>
    );
};

export const UsersSkeleton = () => {
    return (
        <SwiperSlider>
            {[...Array(10)].map((_, index) => {
                return (
                    <Skeleton
                        key={index}
                        className="w-[225px] h-[312px] rounded-[2rem]"
                    />
                );
            })}
        </SwiperSlider>
    );
};

export const GroupsSkeleton = () => {
    return (
        <SwiperSlider>
            {[...Array(10)].map((_, index) => {
                return (
                    <Skeleton
                        key={index}
                        className="w-[250px] h-[355px] rounded-[0.5rem]"
                    />
                );
            })}
        </SwiperSlider>
    );
};

export default SearchPage;
