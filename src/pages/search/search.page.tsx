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

const SearchPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [NoUsersFound, setNoUsersFound] = useState(false);
    const [NoArticlesFound, setNoArticlesFound] = useState(false);
    const [NoGroupsFound, setNoGroupsFound] = useState(false);

    const { ID: storedUserId, Username } = useSelector(
        (state: RootState) => state.auth.user,
    );
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
    const recommendedArticles = _articleRecommendation?.data
        ?.Results as ReceivedArticle[];

    const [
        triggerGroupsRecommendation,
        {
            data: _groupRecommendation,
            isFetching: groupsRecommendationsIsFetching,
        },
    ] = useLazyFetchGeneralGroupsRecommendationQuery();
    const recommendedGroups = _groupRecommendation?.data
        ?.Results as ReceivedGroup[];

    const [
        triggerUsersRecommendation,
        {
            data: _userRecommendation,
            isFetching: usersRecommendationsIsFetching,
        },
    ] = useLazyFetchSpecificUsersRecommendationQuery();

    const recommendedUsers = _userRecommendation?.data
        ?.Results as ReceivedUser[];

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
                {usersRecommendationsIsFetching || generalSearchIsFetching ? (
                    <UsersSkeleton />
                ) : (
                    <SwiperSlider>
                        {(searchInitiated
                            ? searchResult?.users?.slice(0, 10)
                            : recommendedUsers
                        )?.map((user) => {
                            return <UserCard {...user} />;
                        })}
                    </SwiperSlider>
                )}
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
                {generalSearchIsFetching || groupsRecommendationsIsFetching ? (
                    <GroupsSkeleton />
                ) : (
                    <SwiperSlider>
                        {searchResult?.groups?.slice(0, 10)?.map((group) => {
                            return (
                                <GroupCard
                                    {...group}
                                    alreadyJoined={
                                        group?.GroupMembers?.some(
                                            (member) =>
                                                member?.ID === storedUserId,
                                        ) ||
                                        group?.GroupOwner?.ID === storedUserId
                                    }
                                />
                            );
                        })}
                    </SwiperSlider>
                )}
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
                {articlesRecommendationIsFetching || generalSearchIsFetching ? (
                    <ArticlesSkeleton />
                ) : (
                    <ArticleSectionBody>
                        {(searchInitiated
                            ? searchResult?.articles?.slice(0, 10)
                            : recommendedArticles
                        )?.map((article) => {
                            return (
                                <WideArticleItem
                                    {...article}
                                    key={article.ID}
                                    onClick={() =>
                                        navigate(`/app/articles/${article.ID}`)
                                    }
                                />
                            );
                        })}
                    </ArticleSectionBody>
                )}
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
